import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const usersTable = pgTable(
  "usuarios",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    name: varchar().notNull(),

    username: varchar().notNull(),

    email: varchar().notNull(),

    senha: varchar().notNull(), // guarda o HASH do bcrypt, nunca a senha pura

    avatar: varchar(), // URL da imagem (opcional)

    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("usuarios_email_unique").on(table.email),
    uniqueIndex("usuarios_username_unique").on(table.username),
  ]
);