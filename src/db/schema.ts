// src/db/schema.ts
import { sql } from 'drizzle-orm';
import { sqliteTable, integer,text } from "drizzle-orm/sqlite-core"

export const traffic = sqliteTable('traffic', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  id_simpang: integer('id_simpang').notNull(),
  tipe_pendekat: text('tipe_pendekat').notNull(),
  dari_arah: text('dari_arah').notNull(),
  ke_arah: text('ke_arah').notNull(),
  sm: integer('sm').notNull(),
  mp: integer('mp').notNull(),
  aup: integer('aup').notNull(),
  waktu: text('waktu').notNull(),
  created_at: text('created_at').default(sql`DATE('now')`),
});
