import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { flashcards } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate that body is an array
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { 
          error: 'Request body must be an array of flashcard objects',
          code: 'INVALID_BODY_TYPE'
        },
        { status: 400 }
      );
    }

    // Validate array is not empty
    if (body.length === 0) {
      return NextResponse.json(
        { 
          error: 'Array must contain at least one flashcard',
          code: 'EMPTY_ARRAY'
        },
        { status: 400 }
      );
    }

    const validLevels = ['JC', 'Secondary'];
    const validEconomicsTypes = ['Microeconomics', 'Macroeconomics'];
    const validDifficulties = ['Easy', 'Medium', 'Hard'];

    // Validate each flashcard object
    const validatedFlashcards = [];
    for (let i = 0; i < body.length; i++) {
      const flashcard = body[i];

      // Check required fields
      const requiredFields = ['question', 'answer', 'level', 'category', 'topic', 'economicsType', 'chapter'];
      const missingFields = requiredFields.filter(field => !flashcard[field]);

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            error: `Flashcard at index ${i} is missing required fields: ${missingFields.join(', ')}`,
            code: 'MISSING_REQUIRED_FIELDS',
            index: i
          },
          { status: 400 }
        );
      }

      // Validate level
      if (!validLevels.includes(flashcard.level)) {
        return NextResponse.json(
          { 
            error: `Flashcard at index ${i} has invalid level. Must be "JC" or "Secondary"`,
            code: 'INVALID_LEVEL',
            index: i,
            received: flashcard.level
          },
          { status: 400 }
        );
      }

      // Validate economicsType
      if (!validEconomicsTypes.includes(flashcard.economicsType)) {
        return NextResponse.json(
          { 
            error: `Flashcard at index ${i} has invalid economicsType. Must be "Microeconomics" or "Macroeconomics"`,
            code: 'INVALID_ECONOMICS_TYPE',
            index: i,
            received: flashcard.economicsType
          },
          { status: 400 }
        );
      }

      // Validate difficulty if provided
      if (flashcard.difficulty !== undefined && flashcard.difficulty !== null) {
        if (!validDifficulties.includes(flashcard.difficulty)) {
          return NextResponse.json(
            { 
              error: `Flashcard at index ${i} has invalid difficulty. Must be "Easy", "Medium", "Hard", or null`,
              code: 'INVALID_DIFFICULTY',
              index: i,
              received: flashcard.difficulty
            },
            { status: 400 }
          );
        }
      }

      // Sanitize and prepare data
      const timestamp = new Date().toISOString();
      validatedFlashcards.push({
        question: flashcard.question.trim(),
        answer: flashcard.answer.trim(),
        level: flashcard.level,
        category: flashcard.category.trim(),
        topic: flashcard.topic.trim(),
        difficulty: flashcard.difficulty || null,
        economicsType: flashcard.economicsType,
        chapter: flashcard.chapter.trim(),
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }

    // Bulk insert all validated flashcards
    const inserted = await db.insert(flashcards)
      .values(validatedFlashcards)
      .returning();

    return NextResponse.json(
      {
        message: `${inserted.length} flashcards inserted successfully`,
        count: inserted.length,
        insertedIds: inserted.map(card => card.id)
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST batch flashcards error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}