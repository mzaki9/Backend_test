CREATE TABLE `traffic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_simpang` integer NOT NULL,
	`tipe_pendekat` text NOT NULL,
	`dari_arah` text NOT NULL,
	`ke_arah` text NOT NULL,
	`sm` integer NOT NULL,
	`mp` integer NOT NULL,
	`aup` integer NOT NULL,
	`waktu` text NOT NULL,
	`created_at` text DEFAULT DATE('now')
);
