import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { flashcards } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single flashcard fetch
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const flashcard = await db.select()
        .from(flashcards)
        .where(eq(flashcards.id, parseInt(id)))
        .limit(1);

      if (flashcard.length === 0) {
        return NextResponse.json({ 
          error: 'Flashcard not found',
          code: 'FLASHCARD_NOT_FOUND'
        }, { status: 404 });
      }

      return NextResponse.json(flashcard[0]);
    }

    // List flashcards with filtering, search, and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');

    let query = db.select().from(flashcards);

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(flashcards.question, `%${search}%`),
          like(flashcards.answer, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(flashcards.level, level));
    }

    if (category) {
      conditions.push(eq(flashcards.category, category));
    }

    if (topic) {
      conditions.push(eq(flashcards.topic, topic));
    }

    if (difficulty) {
      conditions.push(eq(flashcards.difficulty, difficulty));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(flashcards.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, level, category, topic, difficulty } = body;

    // Validate required fields
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return NextResponse.json({ 
        error: "Question is required and must be a non-empty string",
        code: "INVALID_QUESTION" 
      }, { status: 400 });
    }

    if (!answer || typeof answer !== 'string' || answer.trim() === '') {
      return NextResponse.json({ 
        error: "Answer is required and must be a non-empty string",
        code: "INVALID_ANSWER" 
      }, { status: 400 });
    }

    if (!level || (level !== 'JC' && level !== 'Secondary')) {
      return NextResponse.json({ 
        error: "Level must be either 'JC' or 'Secondary'",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return NextResponse.json({ 
        error: "Category is required and must be a non-empty string",
        code: "INVALID_CATEGORY" 
      }, { status: 400 });
    }

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ 
        error: "Topic is required and must be a non-empty string",
        code: "INVALID_TOPIC" 
      }, { status: 400 });
    }

    // Validate difficulty if provided
    if (difficulty !== undefined && difficulty !== null) {
      if (difficulty !== 'Easy' && difficulty !== 'Medium' && difficulty !== 'Hard') {
        return NextResponse.json({ 
          error: "Difficulty must be 'Easy', 'Medium', or 'Hard'",
          code: "INVALID_DIFFICULTY" 
        }, { status: 400 });
      }
    }

    const now = new Date().toISOString();

    const newFlashcard = await db.insert(flashcards)
      .values({
        question: question.trim(),
        answer: answer.trim(),
        level: level.trim(),
        category: category.trim(),
        topic: topic.trim(),
        difficulty: difficulty ? difficulty.trim() : null,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newFlashcard[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        error: "ID query parameter is required",
        code: "MISSING_ID_PARAM" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if flashcard exists
    const existing = await db.select()
      .from(flashcards)
      .where(eq(flashcards.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Flashcard not found',
        code: 'FLASHCARD_NOT_FOUND'
      }, { status: 404 });
    }

    const body = await request.json();
    const { question, answer, level, category, topic, difficulty } = body;

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    // Validate and add fields if provided
    if (question !== undefined) {
      if (typeof question !== 'string' || question.trim() === '') {
        return NextResponse.json({ 
          error: "Question must be a non-empty string",
          code: "INVALID_QUESTION" 
        }, { status: 400 });
      }
      updates.question = question.trim();
    }

    if (answer !== undefined) {
      if (typeof answer !== 'string' || answer.trim() === '') {
        return NextResponse.json({ 
          error: "Answer must be a non-empty string",
          code: "INVALID_ANSWER" 
        }, { status: 400 });
      }
      updates.answer = answer.trim();
    }

    if (level !== undefined) {
      if (level !== 'JC' && level !== 'Secondary') {
        return NextResponse.json({ 
          error: "Level must be either 'JC' or 'Secondary'",
          code: "INVALID_LEVEL" 
        }, { status: 400 });
      }
      updates.level = level.trim();
    }

    if (category !== undefined) {
      if (typeof category !== 'string' || category.trim() === '') {
        return NextResponse.json({ 
          error: "Category must be a non-empty string",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      updates.category = category.trim();
    }

    if (topic !== undefined) {
      if (typeof topic !== 'string' || topic.trim() === '') {
        return NextResponse.json({ 
          error: "Topic must be a non-empty string",
          code: "INVALID_TOPIC" 
        }, { status: 400 });
      }
      updates.topic = topic.trim();
    }

    if (difficulty !== undefined) {
      if (difficulty !== null && difficulty !== 'Easy' && difficulty !== 'Medium' && difficulty !== 'Hard') {
        return NextResponse.json({ 
          error: "Difficulty must be 'Easy', 'Medium', or 'Hard'",
          code: "INVALID_DIFFICULTY" 
        }, { status: 400 });
      }
      updates.difficulty = difficulty ? difficulty.trim() : null;
    }

    const updated = await db.update(flashcards)
      .set(updates)
      .where(eq(flashcards.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        error: "ID query parameter is required",
        code: "MISSING_ID_PARAM" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const deleted = await db.delete(flashcards)
      .where(eq(flashcards.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Flashcard not found',
        code: 'FLASHCARD_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Flashcard deleted successfully',
      flashcard: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}