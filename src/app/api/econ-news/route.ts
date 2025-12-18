import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { econNews } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

function parseEconNews(news: any) {
  return {
    ...news,
    newsCategory: news.newsCategory || news.news_category || 'International',
    topics: typeof news.topics === 'string' ? JSON.parse(news.topics) : news.topics,
    theories: typeof news.theories === 'string' ? JSON.parse(news.theories) : news.theories
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const news = await db.select()
        .from(econNews)
        .where(eq(econNews.id, parseInt(id)))
        .limit(1);

      if (news.length === 0) {
        return NextResponse.json({ 
          error: 'News article not found',
          code: "NEWS_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(parseEconNews(news[0]), { status: 200 });
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const level = searchParams.get('level');

    let query = db.select().from(econNews);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(econNews.title, `%${search}%`),
          like(econNews.summary, `%${search}%`)
        )
      );
    }

    if (level) {
      conditions.push(eq(econNews.level, level));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(econNews.publishedDate))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results.map(parseEconNews), { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, summary, level, topics, theories, publishedDate } = body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (!summary || typeof summary !== 'string' || summary.trim() === '') {
      return NextResponse.json({ 
        error: "Summary is required and must be a non-empty string",
        code: "INVALID_SUMMARY" 
      }, { status: 400 });
    }

    const sanitizedLevel = level && (level === 'JC' || level === 'Secondary' || level === 'Both') ? level : 'Both';

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json({ 
        error: "Topics is required and must be an array",
        code: "INVALID_TOPICS" 
      }, { status: 400 });
    }

    if (!theories || !Array.isArray(theories)) {
      return NextResponse.json({ 
        error: "Theories is required and must be an array",
        code: "INVALID_THEORIES" 
      }, { status: 400 });
    }

    const sanitizedTitle = title.trim();
    const sanitizedSummary = summary.trim();
    const sanitizedPublishedDate = publishedDate || new Date().toISOString();
    const now = new Date().toISOString();

    const newNews = await db.insert(econNews)
      .values({
        title: sanitizedTitle,
        summary: sanitizedSummary,
        level: sanitizedLevel,
        topics: JSON.stringify(topics),
        theories: JSON.stringify(theories),
        publishedDate: sanitizedPublishedDate,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(parseEconNews(newNews[0]), { status: 201 });

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
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
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
    const { title, summary, level, topics, theories, publishedDate } = body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (!summary || typeof summary !== 'string' || summary.trim() === '') {
      return NextResponse.json({ 
        error: "Summary is required and must be a non-empty string",
        code: "INVALID_SUMMARY" 
      }, { status: 400 });
    }

    const sanitizedLevel = level && (level === 'JC' || level === 'Secondary' || level === 'Both') ? level : 'Both';

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json({ 
        error: "Topics is required and must be an array",
        code: "INVALID_TOPICS" 
      }, { status: 400 });
    }

    if (!theories || !Array.isArray(theories)) {
      return NextResponse.json({ 
        error: "Theories is required and must be an array",
        code: "INVALID_THEORIES" 
      }, { status: 400 });
    }

    const existingNews = await db.select()
      .from(econNews)
      .where(eq(econNews.id, parseInt(id)))
      .limit(1);

    if (existingNews.length === 0) {
      return NextResponse.json({ 
        error: 'News article not found',
        code: "NEWS_NOT_FOUND" 
      }, { status: 404 });
    }

    const sanitizedTitle = title.trim();
    const sanitizedSummary = summary.trim();
    const sanitizedPublishedDate = publishedDate || existingNews[0].publishedDate;
    const now = new Date().toISOString();

    const updatedNews = await db.update(econNews)
      .set({
        title: sanitizedTitle,
        summary: sanitizedSummary,
        level: sanitizedLevel,
        topics: JSON.stringify(topics),
        theories: JSON.stringify(theories),
        publishedDate: sanitizedPublishedDate,
        updatedAt: now
      })
      .where(eq(econNews.id, parseInt(id)))
      .returning();

    return NextResponse.json(parseEconNews(updatedNews[0]), { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const existingNews = await db.select()
      .from(econNews)
      .where(eq(econNews.id, parseInt(id)))
      .limit(1);

    if (existingNews.length === 0) {
      return NextResponse.json({ 
        error: 'News article not found',
        code: "NEWS_NOT_FOUND" 
      }, { status: 404 });
    }

    const deletedNews = await db.delete(econNews)
      .where(eq(econNews.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'News article deleted successfully',
      news: deletedNews[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}
