import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const noteTable = sqliteTable("note_table", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    content: text().notNull(),
});
