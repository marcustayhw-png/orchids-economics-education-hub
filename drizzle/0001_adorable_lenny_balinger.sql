CREATE TABLE `csq_parts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`csq_id` integer NOT NULL,
	`part` text NOT NULL,
	`question` text NOT NULL,
	`marks` text NOT NULL,
	`extract` text,
	`marking_scheme` text,
	`model_answer` text,
	`order_index` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`csq_id`) REFERENCES `csqs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `csqs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`csq_id` text NOT NULL,
	`title` text NOT NULL,
	`level` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `csqs_csq_id_unique` ON `csqs` (`csq_id`);--> statement-breakpoint
CREATE TABLE `essays` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`essay_id` text NOT NULL,
	`question` text NOT NULL,
	`level` text NOT NULL,
	`marks` text NOT NULL,
	`preamble` text,
	`examiner_comments` text,
	`structure_notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `essays_essay_id_unique` ON `essays` (`essay_id`);