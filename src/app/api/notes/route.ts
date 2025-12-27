import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

// Helper function to parse note topics
function parseNote(note: any) {
  return {
    ...note,
    topics: typeof note.topics === 'string' ? JSON.parse(note.topics) : note.topics
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single note by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const note = await db.select()
        .from(notes)
        .where(eq(notes.id, parseInt(id)))
        .limit(1);

      if (note.length === 0) {
        return NextResponse.json({ 
          error: 'Note not found',
          code: "NOTE_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(parseNote(note[0]), { status: 200 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');
    const category = searchParams.get('category');

    let query = db.select().from(notes);

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(notes.title, `%${search}%`),
          like(notes.category, `%${search}%`),
          like(notes.description, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(notes.level, level));
    }

    if (category) {
      conditions.push(eq(notes.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(notes.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results.map(parseNote), { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, level, topics, description, pdfUrl } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json({ 
        error: "Category is required and must be a non-empty string",
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    if (!level || (level !== 'JC' && level !== 'Secondary')) {
      return NextResponse.json({ 
        error: "Level is required and must be either 'JC' or 'Secondary'",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json({ 
        error: "Topics is required and must be an array",
        code: "INVALID_TOPICS" 
      }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ 
        error: "Description is required and must be a non-empty string",
        code: "INVALID_DESCRIPTION" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedCategory = category.trim();
    const sanitizedDescription = description.trim();
    const sanitizedPdfUrl = pdfUrl && typeof pdfUrl === 'string' ? pdfUrl.trim() : null;

    const now = new Date().toISOString();

    const newNote = await db.insert(notes)
      .values({
        title: sanitizedTitle,
        category: sanitizedCategory,
        level,
        topics: JSON.stringify(topics),
        description: sanitizedDescription,
        pdfUrl: sanitizedPdfUrl,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(parseNote(newNote[0]), { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const body = await request.json();
    const { title, category, level, topics, description, pdfUrl } = body;

    // Check if note exists
    const existingNote = await db.select()
      .from(notes)
      .where(eq(notes.id, parseInt(id)))
      .limit(1);

    if (existingNote.length === 0) {
      return NextResponse.json({ 
        error: 'Note not found',
        code: "NOTE_NOT_FOUND" 
      }, { status: 404 });
    }

    // Validate fields if provided
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return NextResponse.json({ 
        error: "Title must be a non-empty string",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
      return NextResponse.json({ 
        error: "Category must be a non-empty string",
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    if (level !== undefined && level !== 'JC' && level !== 'Secondary') {
      return NextResponse.json({ 
        error: "Level must be either 'JC' or 'Secondary'",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }

    if (topics !== undefined && !Array.isArray(topics)) {
      return NextResponse.json({ 
        error: "Topics must be an array",
        code: "INVALID_TOPICS" 
      }, { status: 400 });
    }

    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      return NextResponse.json({ 
        error: "Description must be a non-empty string",
        code: "INVALID_DESCRIPTION" 
      }, { status: 400 });
    }

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) updates.title = title.trim();
    if (category !== undefined) updates.category = category.trim();
    if (level !== undefined) updates.level = level;
    if (topics !== undefined) updates.topics = JSON.stringify(topics);
    if (description !== undefined) updates.description = description.trim();
    if (pdfUrl !== undefined) {
      updates.pdfUrl = pdfUrl && typeof pdfUrl === 'string' ? pdfUrl.trim() : null;
    }

    const updatedNote = await db.update(notes)
      .set(updates)
      .where(eq(notes.id, parseInt(id)))
      .returning();

    return NextResponse.json(parseNote(updatedNote[0]), { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if note exists
    const existingNote = await db.select()
      .from(notes)
      .where(eq(notes.id, parseInt(id)))
      .limit(1);

    if (existingNote.length === 0) {
      return NextResponse.json({ 
        error: 'Note not found',
        code: "NOTE_NOT_FOUND" 
      }, { status: 404 });
    }

    const deletedNote = await db.delete(notes)
      .where(eq(notes.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Note deleted successfully',
      note: deletedNote[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}