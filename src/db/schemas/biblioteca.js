
import {
  pgTable,
  uuid,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { usersTable } from "./usuarios.js";
import { jogosTable } from "./jogos.js";

export const statusBibliotecaEnum = pgEnum(
  "status_biblioteca",
  ["zerado", "jogando", "desejado"]
);

export const bibliotecaTable = pgTable(
  "biblioteca",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),

    jogoId: uuid("jogo_id")
      .notNull()
      .references(() => jogosTable.id, {
        onDelete: "cascade",
      }),

    status: statusBibliotecaEnum("status")
      .notNull()
      .default("desejado"),

    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("biblioteca_usuario_jogo_unique").on(
      table.usuarioId,
      table.jogoId
    ),
  ]
);
