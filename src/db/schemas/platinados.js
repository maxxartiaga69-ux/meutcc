import { pgTable, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./usuarios.js";

export const platinadosTable = pgTable("platinados", {
  id: uuid().primaryKey().default(sql`gen_random_uuid()`),
  usuarioId: uuid("usuario_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});