CREATE TABLE `account` (
	`accountId` text PRIMARY KEY NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`version` integer DEFAULT 0
);
