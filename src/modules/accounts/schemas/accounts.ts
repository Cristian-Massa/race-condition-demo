
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const account = sqliteTable("account", {
  accountId: text().primaryKey(),
  amount: real().notNull().default(0),
  version: int().default(0)
});

export type AccountGet = typeof account.$inferSelect
export type AccountPost = typeof account.$inferInsert