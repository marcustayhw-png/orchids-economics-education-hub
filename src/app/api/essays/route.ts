import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { essays } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const essayId = searchParams.get('essay_id');

    // Single essay by essay_id
    if (essayId) {
      const essay = await db.select()
        .from(essays)
        .where(eq(essays.essayId, essayId))
        .limit(1);

      if (essay.length === 0) {
        return NextResponse.json({ 
          error: 'Essay not found',
          code: 'ESSAY_NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(essay[0], { status: 200 });
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');

    let query = db.select().from(essays);
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(essays.question, `%${search}%`),
          like(essays.essayId, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(essays.level, level));
    }

    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
    }

    const results = await query
      .orderBy(desc(essays.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

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

    // Validate required fields
    if (!body.essayId) {
      return NextResponse.json({ 
        error: 'essayId is required',
        code: 'MISSING_ESSAY_ID' 
      }, { status: 400 });
    }

    if (!body.question) {
      return NextResponse.json({ 
        error: 'question is required',
        code: 'MISSING_QUESTION' 
      }, { status: 400 });
    }

    if (!body.level) {
      return NextResponse.json({ 
        error: 'level is required',
        code: 'MISSING_LEVEL' 
      }, { status: 400 });
    }

    if (!body.marks) {
      return NextResponse.json({ 
        error: 'marks is required',
        code: 'MISSING_MARKS' 
      }, { status: 400 });
    }

    // Validate level is either JC or Secondary
    if (body.level !== 'JC' && body.level !== 'Secondary') {
      return NextResponse.json({ 
        error: 'level must be either "JC" or "Secondary"',
        code: 'INVALID_LEVEL' 
      }, { status: 400 });
    }

    // Check if essayId already exists
    const existing = await db.select()
      .from(essays)
      .where(eq(essays.essayId, body.essayId))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ 
        error: 'Essay with this essayId already exists',
        code: 'DUPLICATE_ESSAY_ID' 
      }, { status: 400 });
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData = {
      essayId: body.essayId.trim(),
      question: body.question.trim(),
      level: body.level,
      marks: body.marks.trim(),
      preamble: body.preamble ? body.preamble.trim() : null,
      examinerComments: body.examinerComments || null,
      structureNotes: body.structureNotes ? body.structureNotes.trim() : null,
      createdAt: now,
      updatedAt: now,
    };

    const newEssay = await db.insert(essays)
      .values(insertData)
      .returning();

    return NextResponse.json(newEssay[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const essayId = searchParams.get('essay_id');

    if (!essayId) {
      return NextResponse.json({ 
        error: 'essay_id parameter is required',
        code: 'MISSING_ESSAY_ID_PARAM' 
      }, { status: 400 });
    }

    // Check if essay exists
    const existing = await db.select()
      .from(essays)
      .where(eq(essays.essayId, essayId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Essay not found',
        code: 'ESSAY_NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();

    // Validate level if provided
    if (body.level && body.level !== 'JC' && body.level !== 'Secondary') {
      return NextResponse.json({ 
        error: 'level must be either "JC" or "Secondary"',
        code: 'INVALID_LEVEL' 
      }, { status: 400 });
    }

    // Prepare update data (exclude id and essayId)
    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (body.question !== undefined) updateData.question = body.question.trim();
    if (body.level !== undefined) updateData.level = body.level;
    if (body.marks !== undefined) updateData.marks = body.marks.trim();
    if (body.preamble !== undefined) updateData.preamble = body.preamble ? body.preamble.trim() : null;
    if (body.examinerComments !== undefined) updateData.examinerComments = body.examinerComments;
    if (body.structureNotes !== undefined) updateData.structureNotes = body.structureNotes ? body.structureNotes.trim() : null;

    const updated = await db.update(essays)
      .set(updateData)
      .where(eq(essays.essayId, essayId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const essayId = searchParams.get('essay_id');

    if (!essayId) {
      return NextResponse.json({ 
        error: 'essay_id parameter is required',
        code: 'MISSING_ESSAY_ID_PARAM' 
      }, { status: 400 });
    }

    // Check if essay exists
    const existing = await db.select()
      .from(essays)
      .where(eq(essays.essayId, essayId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Essay not found',
        code: 'ESSAY_NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(essays)
      .where(eq(essays.essayId, essayId))
      .returning();

    return NextResponse.json({
      message: 'Essay deleted successfully',
      essay: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}