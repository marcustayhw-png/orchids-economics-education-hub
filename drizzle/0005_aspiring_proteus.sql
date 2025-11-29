CREATE TABLE `flashcards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`level` text NOT NULL,
	`category` text NOT NULL,
	`topic` text NOT NULL,
	`difficulty` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
