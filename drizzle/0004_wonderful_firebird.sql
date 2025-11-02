DROP TABLE `practice_questions`;--> statement-breakpoint
ALTER TABLE `csqs` ADD `topic` text NOT NULL;--> statement-breakpoint
ALTER TABLE `csqs` ADD `difficulty` text NOT NULL;--> statement-breakpoint
ALTER TABLE `csqs` ADD `total_marks` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `essays` ADD `topic` text NOT NULL;--> statement-breakpoint
ALTER TABLE `essays` ADD `difficulty` text NOT NULL;