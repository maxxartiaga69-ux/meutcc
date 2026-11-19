
import {
  pgTable,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { usersTable } from "./usuarios.js";
import { jogosTable } from "./jogos.js";

export const platinadosTable = pgTable(
  "platinados",
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

    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("platinados_usuario_jogo_unique").on(
      table.usuarioId,
      table.jogoId
    ),
  ]
);
