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
    const category = searchParams.get('category');

    let query = db.select().from(econNews);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(econNews.title, `%${search}%`),
          like(econNews.content, `%${search}%`),
          like(econNews.explanation, `%${search}%`),
          like(econNews.context, `%${search}%`)
        )
      );
    }

    if (category && category !== 'All') {
      conditions.push(eq(econNews.newsCategory, category));
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
    const { 
      title, 
      content, 
      theoryDescription, 
      howItWorks, 
      strengths, 
      limitations, 
      evaluation, 
      newsCategory, 
      topics, 
      theories, 
      publishedDate 
    } = body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json({ 
        error: "Content is required",
        code: "INVALID_CONTENT" 
      }, { status: 400 });
    }

    const sanitizedCategory = newsCategory && (newsCategory === 'International' || newsCategory === 'Singapore') ? newsCategory : 'International';

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json({ 
        error: "Topics must be an array",
        code: "INVALID_TOPICS" 
      }, { status: 400 });
    }

    if (!theories || !Array.isArray(theories)) {
      return NextResponse.json({ 
        error: "Theories must be an array",
        code: "INVALID_THEORIES" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    const newNews = await db.insert(econNews)
      .values({
        title: title.trim(),
        content: content.trim(),
        theoryDescription: theoryDescription?.trim(),
        howItWorks: howItWorks?.trim(),
        strengths: strengths?.trim(),
        limitations: limitations?.trim(),
        evaluation: evaluation?.trim(),
        newsCategory: sanitizedCategory,
        topics: JSON.stringify(topics),
        theories: JSON.stringify(theories),
        publishedDate: publishedDate || now,
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
    const { 
      title, 
      content, 
      theoryDescription, 
      howItWorks, 
      strengths, 
      limitations, 
      evaluation, 
      newsCategory, 
      topics, 
      theories, 
      publishedDate 
    } = body;

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

    const now = new Date().toISOString();

    const updatedNews = await db.update(econNews)
      .set({
        title: title?.trim() || existingNews[0].title,
        content: content?.trim() || existingNews[0].content,
        theoryDescription: theoryDescription?.trim() ?? existingNews[0].theoryDescription,
        howItWorks: howItWorks?.trim() ?? existingNews[0].howItWorks,
        strengths: strengths?.trim() ?? existingNews[0].strengths,
        limitations: limitations?.trim() ?? existingNews[0].limitations,
        evaluation: evaluation?.trim() ?? existingNews[0].evaluation,
        newsCategory: newsCategory || existingNews[0].newsCategory,
        topics: topics ? JSON.stringify(topics) : existingNews[0].topics,
        theories: theories ? JSON.stringify(theories) : existingNews[0].theories,
        publishedDate: publishedDate || existingNews[0].publishedDate,
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

    const deletedNews = await db.delete(econNews)
      .where(eq(econNews.id, parseInt(id)))
      .returning();

    if (deletedNews.length === 0) {
      return NextResponse.json({ 
        error: 'News article not found',
        code: "NEWS_NOT_FOUND" 
      }, { status: 404 });
    }

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
