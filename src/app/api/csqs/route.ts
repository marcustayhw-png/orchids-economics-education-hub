import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { csqs, csqParts } from '@/db/schema';
import { eq, like, or, and, asc, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const csqId = searchParams.get('csq_id');

    // Single CSQ by csq_id
    if (csqId) {
      const csq = await db.select()
        .from(csqs)
        .where(eq(csqs.csqId, csqId))
        .limit(1);

      if (csq.length === 0) {
        return NextResponse.json({ 
          error: 'CSQ not found',
          code: 'CSQ_NOT_FOUND' 
        }, { status: 404 });
      }

      const parts = await db.select()
        .from(csqParts)
        .where(eq(csqParts.csqId, csq[0].id))
        .orderBy(asc(csqParts.orderIndex));

      return NextResponse.json({
        ...csq[0],
        parts
      });
    }

    // List all CSQs with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');

    let query = db.select().from(csqs);

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(csqs.title, `%${search}%`),
          like(csqs.csqId, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(csqs.level, level));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const csqList = await query
      .orderBy(desc(csqs.createdAt))
      .limit(limit)
      .offset(offset);

    // Fetch parts for all CSQs
    const csqIds = csqList.map(c => c.id);
    const allParts = csqIds.length > 0
      ? await db.select()
          .from(csqParts)
          .where(
            or(...csqIds.map(id => eq(csqParts.csqId, id)))
          )
          .orderBy(asc(csqParts.orderIndex))
      : [];

    // Group parts by csqId
    const partsMap = allParts.reduce((acc, part) => {
      if (!acc[part.csqId]) {
        acc[part.csqId] = [];
      }
      acc[part.csqId].push(part);
      return acc;
    }, {} as Record<number, typeof allParts>);

    // Combine CSQs with their parts
    const result = csqList.map(csq => ({
      ...csq,
      parts: partsMap[csq.id] || []
    }));

    return NextResponse.json(result);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { csqId, title, level, parts } = body;

    // Validation
    if (!csqId || typeof csqId !== 'string' || !csqId.trim()) {
      return NextResponse.json({ 
        error: 'csqId is required and must be a non-empty string',
        code: 'MISSING_CSQ_ID' 
      }, { status: 400 });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ 
        error: 'title is required and must be a non-empty string',
        code: 'MISSING_TITLE' 
      }, { status: 400 });
    }

    if (!level || typeof level !== 'string') {
      return NextResponse.json({ 
        error: 'level is required',
        code: 'MISSING_LEVEL' 
      }, { status: 400 });
    }

    if (level !== 'JC' && level !== 'Secondary') {
      return NextResponse.json({ 
        error: 'level must be either "JC" or "Secondary"',
        code: 'INVALID_LEVEL' 
      }, { status: 400 });
    }

    // Check if csqId already exists
    const existing = await db.select()
      .from(csqs)
      .where(eq(csqs.csqId, csqId.trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ 
        error: 'csqId already exists',
        code: 'DUPLICATE_CSQ_ID' 
      }, { status: 400 });
    }

    // Validate parts if provided
    if (parts && !Array.isArray(parts)) {
      return NextResponse.json({ 
        error: 'parts must be an array',
        code: 'INVALID_PARTS_FORMAT' 
      }, { status: 400 });
    }

    if (parts) {
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part.part || typeof part.part !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: part field is required and must be a string`,
            code: 'INVALID_PART_FIELD' 
          }, { status: 400 });
        }
        if (!part.question || typeof part.question !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: question field is required and must be a string`,
            code: 'INVALID_QUESTION_FIELD' 
          }, { status: 400 });
        }
        if (!part.marks || typeof part.marks !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: marks field is required and must be a string`,
            code: 'INVALID_MARKS_FIELD' 
          }, { status: 400 });
        }
      }
    }

    const now = new Date().toISOString();

    // Create CSQ
    const newCsq = await db.insert(csqs)
      .values({
        csqId: csqId.trim(),
        title: title.trim(),
        level,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    // Create parts if provided
    let createdParts = [];
    if (parts && parts.length > 0) {
      const partsToInsert = parts.map((part: any, index: number) => ({
        csqId: newCsq[0].id,
        part: part.part.trim(),
        question: part.question.trim(),
        marks: part.marks.trim(),
        extract: part.extract ? part.extract.trim() : null,
        markingScheme: part.markingScheme || null,
        modelAnswer: part.modelAnswer ? part.modelAnswer.trim() : null,
        orderIndex: part.orderIndex !== undefined ? part.orderIndex : index
      }));

      createdParts = await db.insert(csqParts)
        .values(partsToInsert)
        .returning();
    }

    return NextResponse.json({
      ...newCsq[0],
      parts: createdParts
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const csqId = searchParams.get('csq_id');

    if (!csqId) {
      return NextResponse.json({ 
        error: 'csq_id query parameter is required',
        code: 'MISSING_CSQ_ID_PARAM' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { title, level, parts } = body;

    // Find existing CSQ
    const existing = await db.select()
      .from(csqs)
      .where(eq(csqs.csqId, csqId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'CSQ not found',
        code: 'CSQ_NOT_FOUND' 
      }, { status: 404 });
    }

    const csqRecord = existing[0];

    // Validate updates
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return NextResponse.json({ 
        error: 'title must be a non-empty string',
        code: 'INVALID_TITLE' 
      }, { status: 400 });
    }

    if (level !== undefined) {
      if (typeof level !== 'string') {
        return NextResponse.json({ 
          error: 'level must be a string',
          code: 'INVALID_LEVEL_TYPE' 
        }, { status: 400 });
      }
      if (level !== 'JC' && level !== 'Secondary') {
        return NextResponse.json({ 
          error: 'level must be either "JC" or "Secondary"',
          code: 'INVALID_LEVEL_VALUE' 
        }, { status: 400 });
      }
    }

    // Validate parts if provided
    if (parts !== undefined) {
      if (!Array.isArray(parts)) {
        return NextResponse.json({ 
          error: 'parts must be an array',
          code: 'INVALID_PARTS_FORMAT' 
        }, { status: 400 });
      }

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part.part || typeof part.part !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: part field is required and must be a string`,
            code: 'INVALID_PART_FIELD' 
          }, { status: 400 });
        }
        if (!part.question || typeof part.question !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: question field is required and must be a string`,
            code: 'INVALID_QUESTION_FIELD' 
          }, { status: 400 });
        }
        if (!part.marks || typeof part.marks !== 'string') {
          return NextResponse.json({ 
            error: `Part ${i + 1}: marks field is required and must be a string`,
            code: 'INVALID_MARKS_FIELD' 
          }, { status: 400 });
        }
      }
    }

    // Update CSQ
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) {
      updates.title = title.trim();
    }

    if (level !== undefined) {
      updates.level = level;
    }

    const updatedCsq = await db.update(csqs)
      .set(updates)
      .where(eq(csqs.id, csqRecord.id))
      .returning();

    // Update parts if provided
    let updatedParts = [];
    if (parts !== undefined) {
      // Delete existing parts
      await db.delete(csqParts)
        .where(eq(csqParts.csqId, csqRecord.id));

      // Insert new parts
      if (parts.length > 0) {
        const partsToInsert = parts.map((part: any, index: number) => ({
          csqId: csqRecord.id,
          part: part.part.trim(),
          question: part.question.trim(),
          marks: part.marks.trim(),
          extract: part.extract ? part.extract.trim() : null,
          markingScheme: part.markingScheme || null,
          modelAnswer: part.modelAnswer ? part.modelAnswer.trim() : null,
          orderIndex: part.orderIndex !== undefined ? part.orderIndex : index
        }));

        updatedParts = await db.insert(csqParts)
          .values(partsToInsert)
          .returning();
      }
    } else {
      // Fetch existing parts if not updating them
      updatedParts = await db.select()
        .from(csqParts)
        .where(eq(csqParts.csqId, csqRecord.id))
        .orderBy(asc(csqParts.orderIndex));
    }

    return NextResponse.json({
      ...updatedCsq[0],
      parts: updatedParts
    });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const csqId = searchParams.get('csq_id');

    if (!csqId) {
      return NextResponse.json({ 
        error: 'csq_id query parameter is required',
        code: 'MISSING_CSQ_ID_PARAM' 
      }, { status: 400 });
    }

    // Find existing CSQ
    const existing = await db.select()
      .from(csqs)
      .where(eq(csqs.csqId, csqId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'CSQ not found',
        code: 'CSQ_NOT_FOUND' 
      }, { status: 404 });
    }

    // Delete CSQ (parts will be deleted automatically due to CASCADE)
    const deleted = await db.delete(csqs)
      .where(eq(csqs.id, existing[0].id))
      .returning();

    return NextResponse.json({
      message: 'CSQ and all related parts deleted successfully',
      deleted: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}