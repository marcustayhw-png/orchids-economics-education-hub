CREATE TABLE `econ_news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`level` text NOT NULL,
	`topics` text NOT NULL,
	`theories` text NOT NULL,
	`published_date` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
