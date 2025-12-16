import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notes, flashcards, csqs } from '@/db/schema';
import { eq, or, like } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const noteId = searchParams.get('note_id');

    if (!noteId || isNaN(parseInt(noteId))) {
      return NextResponse.json({ 
        error: "Valid note_id is required",
        code: "INVALID_NOTE_ID" 
      }, { status: 400 });
    }

    const note = await db.select()
      .from(notes)
      .where(eq(notes.id, parseInt(noteId)))
      .limit(1);

    if (note.length === 0) {
      return NextResponse.json({ 
        error: 'Note not found',
        code: "NOTE_NOT_FOUND" 
      }, { status: 404 });
    }

    const noteData = note[0];
    const noteTopics = typeof noteData.topics === 'string' 
      ? JSON.parse(noteData.topics) 
      : noteData.topics;

    const relatedFlashcards = [];
    const relatedCSQs = [];

    for (const topic of noteTopics) {
      const flashcardResults = await db.select()
        .from(flashcards)
        .where(
          or(
            like(flashcards.topic, `%${topic}%`),
            like(flashcards.chapter, `%${topic}%`),
            eq(flashcards.category, noteData.category)
          )
        )
        .limit(5);

      const csqResults = await db.select()
        .from(csqs)
        .where(
          or(
            like(csqs.topic, `%${topic}%`),
            like(csqs.title, `%${topic}%`)
          )
        )
        .limit(5);

      relatedFlashcards.push(...flashcardResults);
      relatedCSQs.push(...csqResults);
    }

    const uniqueFlashcards = Array.from(
      new Map(relatedFlashcards.map(item => [item.id, item])).values()
    ).slice(0, 3);

    const uniqueCSQs = Array.from(
      new Map(relatedCSQs.map(item => [item.id, item])).values()
    ).slice(0, 3);

    return NextResponse.json({
      flashcards: uniqueFlashcards,
      csqs: uniqueCSQs
    }, { status: 200 });

  } catch (error) {
    console.error('GET related resources error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}
