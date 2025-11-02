import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { 
          error: 'No file provided',
          code: 'NO_FILE_PROVIDED'
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Allowed: PDF, JPG, PNG, WebP, GIF',
          code: 'INVALID_FILE_TYPE'
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { 
          error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
          code: 'FILE_TOO_LARGE'
        },
        { status: 400 }
      );
    }

    // Sanitize original filename to prevent path traversal
    const originalFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const uniqueFilename = `${timestamp}-${randomString}-${originalFilename}`;

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      console.log('Created uploads directory:', UPLOAD_DIR);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define file path
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Write file to disk
    await writeFile(filePath, buffer);
    console.log('File saved successfully:', filePath);

    // Return success response with file URL
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        fileUrl,
        filename: uniqueFilename,
        fileType: file.type
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST /api/upload error:', error);
    
    // Handle specific file system errors
    if (error instanceof Error) {
      if (error.message.includes('EACCES') || error.message.includes('EPERM')) {
        return NextResponse.json(
          { 
            error: 'Permission denied. Unable to save file',
            code: 'PERMISSION_DENIED'
          },
          { status: 500 }
        );
      }
      
      if (error.message.includes('ENOSPC')) {
        return NextResponse.json(
          { 
            error: 'Insufficient disk space',
            code: 'DISK_SPACE_ERROR'
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}