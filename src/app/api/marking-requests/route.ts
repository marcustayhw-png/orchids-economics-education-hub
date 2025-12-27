
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { markingRequests } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, level, subject, fileUrl, fileName } = body;

    if (!email || !level || !fileUrl) {
      return NextResponse.json(
        { error: 'Email, level, and file are required' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const [newRequest] = await db.insert(markingRequests).values({
      email,
      phone,
      level,
      subject,
      fileUrl,
      fileName,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }).returning();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('POST /api/marking-requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    // Ideally check if user is admin, but for now just check if logged in
    if (!user) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = await db.select()
      .from(markingRequests)
      .orderBy(desc(markingRequests.createdAt));

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET /api/marking-requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, adminComments, markedFileUrl } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const [updated] = await db.update(markingRequests)
      .set({
        status,
        adminComments,
        markedFileUrl,
        updatedAt: now,
      })
      .where(eq(markingRequests.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /api/marking-requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
