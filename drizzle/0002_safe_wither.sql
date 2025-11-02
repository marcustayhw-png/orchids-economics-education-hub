CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`level` text NOT NULL,
	`topics` text NOT NULL,
	`description` text NOT NULL,
	`pdf_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `practice_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` text NOT NULL,
	`question` text NOT NULL,
	`topic` text NOT NULL,
	`difficulty` text NOT NULL,
	`level` text NOT NULL,
	`marks` integer NOT NULL,
	`answer` text NOT NULL,
	`pdf_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `practice_questions_question_id_unique` ON `practice_questions` (`question_id`);