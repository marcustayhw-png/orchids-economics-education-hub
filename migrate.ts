import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function migrate() {
  try {
    console.log('Starting migration...');
    
    // Check if columns exist first for notes
    const notesInfo = await client.execute('PRAGMA table_info(notes)');
    const notesColumns = notesInfo.rows.map(r => r.name);
    
    if (!notesColumns.includes('economics_type')) {
      console.log('Adding economics_type to notes...');
      await client.execute('ALTER TABLE notes ADD COLUMN economics_type TEXT');
    }
    
    if (!notesColumns.includes('chapter')) {
      console.log('Adding chapter to notes...');
      await client.execute('ALTER TABLE notes ADD COLUMN chapter TEXT');
    }

    // Check if columns exist for flashcards
    const flashcardsInfo = await client.execute('PRAGMA table_info(flashcards)');
    const flashcardsColumns = flashcardsInfo.rows.map(r => r.name);
    
    if (!flashcardsColumns.includes('economics_type')) {
      console.log('Adding economics_type to flashcards...');
      await client.execute('ALTER TABLE flashcards ADD COLUMN economics_type TEXT');
    }
    
    if (!flashcardsColumns.includes('chapter')) {
      console.log('Adding chapter to flashcards...');
      await client.execute('ALTER TABLE flashcards ADD COLUMN chapter TEXT');
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrate();
