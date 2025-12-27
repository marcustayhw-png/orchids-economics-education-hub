
import { createClient } from '@libsql/client';

async function init() {
  const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  console.log('Creating marking_requests table...');
  await client.execute(`
    CREATE TABLE IF NOT EXISTS marking_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      phone TEXT,
      level TEXT NOT NULL,
      subject TEXT,
      file_url TEXT NOT NULL,
      file_name TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      admin_comments TEXT,
      marked_file_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  console.log('Table created or already exists.');
}

init().catch(console.error);
