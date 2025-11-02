import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { practiceQuestions } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionId = searchParams.get('question_id');

    // Single practice question by questionId
    if (questionId) {
      const record = await db.select()
        .from(practiceQuestions)
        .where(eq(practiceQuestions.questionId, questionId))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ 
          error: 'Practice question not found',
          code: 'NOT_FOUND'
        }, { status: 404 });
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');
    const difficulty = searchParams.get('difficulty');
    const topic = searchParams.get('topic');

    let query = db.select().from(practiceQuestions);

    // Build filter conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(practiceQuestions.question, `%${search}%`),
          like(practiceQuestions.topic, `%${search}%`),
          like(practiceQuestions.questionId, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(practiceQuestions.level, level));
    }

    if (difficulty) {
      conditions.push(eq(practiceQuestions.difficulty, difficulty));
    }

    if (topic) {
      conditions.push(eq(practiceQuestions.topic, topic));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(practiceQuestions.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
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
    const { questionId, question, topic, difficulty, level, marks, answer, pdfUrl } = body;

    // Validate required fields
    if (!questionId || typeof questionId !== 'string' || questionId.trim() === '') {
      return NextResponse.json({ 
        error: 'questionId is required and must be a non-empty string',
        code: 'INVALID_QUESTION_ID'
      }, { status: 400 });
    }

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return NextResponse.json({ 
        error: 'question is required and must be a non-empty string',
        code: 'INVALID_QUESTION'
      }, { status: 400 });
    }

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ 
        error: 'topic is required and must be a non-empty string',
        code: 'INVALID_TOPIC'
      }, { status: 400 });
    }

    if (!difficulty || !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return NextResponse.json({ 
        error: 'difficulty is required and must be "Easy", "Medium", or "Hard"',
        code: 'INVALID_DIFFICULTY'
      }, { status: 400 });
    }

    if (!level || !['JC', 'Secondary'].includes(level)) {
      return NextResponse.json({ 
        error: 'level is required and must be "JC" or "Secondary"',
        code: 'INVALID_LEVEL'
      }, { status: 400 });
    }

    if (!marks || typeof marks !== 'number' || marks <= 0 || !Number.isInteger(marks)) {
      return NextResponse.json({ 
        error: 'marks is required and must be a positive integer',
        code: 'INVALID_MARKS'
      }, { status: 400 });
    }

    if (!answer || typeof answer !== 'string' || answer.trim() === '') {
      return NextResponse.json({ 
        error: 'answer is required and must be a non-empty string',
        code: 'INVALID_ANSWER'
      }, { status: 400 });
    }

    // Check if questionId already exists
    const existing = await db.select()
      .from(practiceQuestions)
      .where(eq(practiceQuestions.questionId, questionId.trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ 
        error: 'A practice question with this questionId already exists',
        code: 'DUPLICATE_QUESTION_ID'
      }, { status: 400 });
    }

    // Prepare insert data
    const now = new Date().toISOString();
    const insertData = {
      questionId: questionId.trim(),
      question: question.trim(),
      topic: topic.trim(),
      difficulty,
      level,
      marks,
      answer: answer.trim(),
      pdfUrl: pdfUrl && typeof pdfUrl === 'string' ? pdfUrl.trim() : null,
      createdAt: now,
      updatedAt: now
    };

    const newRecord = await db.insert(practiceQuestions)
      .values(insertData)
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionId = searchParams.get('question_id');

    if (!questionId || questionId.trim() === '') {
      return NextResponse.json({ 
        error: 'Valid question_id is required',
        code: 'INVALID_QUESTION_ID'
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(practiceQuestions)
      .where(eq(practiceQuestions.questionId, questionId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Practice question not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    const body = await request.json();
    const { question, topic, difficulty, level, marks, answer, pdfUrl } = body;

    // Validate fields if provided
    if (question !== undefined && (typeof question !== 'string' || question.trim() === '')) {
      return NextResponse.json({ 
        error: 'question must be a non-empty string',
        code: 'INVALID_QUESTION'
      }, { status: 400 });
    }

    if (topic !== undefined && (typeof topic !== 'string' || topic.trim() === '')) {
      return NextResponse.json({ 
        error: 'topic must be a non-empty string',
        code: 'INVALID_TOPIC'
      }, { status: 400 });
    }

    if (difficulty !== undefined && !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return NextResponse.json({ 
        error: 'difficulty must be "Easy", "Medium", or "Hard"',
        code: 'INVALID_DIFFICULTY'
      }, { status: 400 });
    }

    if (level !== undefined && !['JC', 'Secondary'].includes(level)) {
      return NextResponse.json({ 
        error: 'level must be "JC" or "Secondary"',
        code: 'INVALID_LEVEL'
      }, { status: 400 });
    }

    if (marks !== undefined && (typeof marks !== 'number' || marks <= 0 || !Number.isInteger(marks))) {
      return NextResponse.json({ 
        error: 'marks must be a positive integer',
        code: 'INVALID_MARKS'
      }, { status: 400 });
    }

    if (answer !== undefined && (typeof answer !== 'string' || answer.trim() === '')) {
      return NextResponse.json({ 
        error: 'answer must be a non-empty string',
        code: 'INVALID_ANSWER'
      }, { status: 400 });
    }

    // Prepare update data
    const updates: Record<string, unknown> = {
      updatedAt: new Date().toISOString()
    };

    if (question !== undefined) updates.question = question.trim();
    if (topic !== undefined) updates.topic = topic.trim();
    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (level !== undefined) updates.level = level;
    if (marks !== undefined) updates.marks = marks;
    if (answer !== undefined) updates.answer = answer.trim();
    if (pdfUrl !== undefined) {
      updates.pdfUrl = pdfUrl && typeof pdfUrl === 'string' ? pdfUrl.trim() : null;
    }

    const updated = await db.update(practiceQuestions)
      .set(updates)
      .where(eq(practiceQuestions.questionId, questionId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
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
    const questionId = searchParams.get('question_id');

    if (!questionId || questionId.trim() === '') {
      return NextResponse.json({ 
        error: 'Valid question_id is required',
        code: 'INVALID_QUESTION_ID'
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(practiceQuestions)
      .where(eq(practiceQuestions.questionId, questionId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Practice question not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    const deleted = await db.delete(practiceQuestions)
      .where(eq(practiceQuestions.questionId, questionId))
      .returning();

    return NextResponse.json({ 
      message: 'Practice question deleted successfully',
      deletedRecord: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}