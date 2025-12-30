import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';



// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Essays table
export const essays = sqliteTable('essays', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  essayId: text('essay_id').notNull().unique(),
  question: text('question').notNull(),
  level: text('level').notNull(),
  marks: text('marks').notNull(),
  topic: text('topic').notNull(),
  difficulty: text('difficulty').notNull(),
  preamble: text('preamble'),
  examinerComments: text('examiner_comments', { mode: 'json' }),
  structureNotes: text('structure_notes'),
  modelAnswer: text('model_answer'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// CSQs table
export const csqs = sqliteTable('csqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  csqId: text('csq_id').notNull().unique(),
  title: text('title').notNull(),
  level: text('level').notNull(),
  topic: text('topic').notNull(),
  difficulty: text('difficulty').notNull(),
  totalMarks: integer('total_marks').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// CSQ Parts table
export const csqParts = sqliteTable('csq_parts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  csqId: integer('csq_id').notNull().references(() => csqs.id, { onDelete: 'cascade' }),
  part: text('part').notNull(),
  question: text('question').notNull(),
  marks: text('marks').notNull(),
  extract: text('extract'),
  markingScheme: text('marking_scheme', { mode: 'json' }),
  modelAnswer: text('model_answer'),
  orderIndex: integer('order_index').notNull().default(0),
});

// Notes table
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  level: text('level').notNull(),
  topics: text('topics', { mode: 'json' }).notNull(),
  description: text('description').notNull(),
  pdfUrl: text('pdf_url'),
  economicsType: text('economics_type'), // Micro or Macro
  chapter: text('chapter'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Flashcards table
export const flashcards = sqliteTable('flashcards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  level: text('level').notNull(),
  category: text('category').notNull(),
  topic: text('topic').notNull(),
  difficulty: text('difficulty'),
  economicsType: text('economics_type').notNull(),
  chapter: text('chapter').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Econ News table
export const econNews = sqliteTable('econ_news', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(), // Summary of news
  context: text('context'), // Elaborated context
  explanation: text('explanation'), // Elaborated explanation
  theoryConnection: text('theory_connection'), // Link to syllabus
  newsCategory: text('news_category').notNull().default('International'),
  topics: text('topics', { mode: 'json' }).notNull(),
  theories: text('theories', { mode: 'json' }).notNull(),
  publishedDate: text('published_date').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
  
  // Marking Requests table
  export const markingRequests = sqliteTable('marking_requests', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull(),
    phone: text('phone'),
    level: text('level').notNull(), // Secondary, JC H1, JC H2
    subject: text('subject'),
    fileUrl: text('file_url').notNull(),
    fileName: text('file_name'),
    status: text('status').notNull().default('pending'), // pending, marking, completed, rejected
    adminComments: text('admin_comments'),
    markedFileUrl: text('marked_file_url'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  });