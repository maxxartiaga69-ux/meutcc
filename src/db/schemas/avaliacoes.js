import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  uniqueIndex,
  index,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { usersTable } from "./usuarios.js";
import { jogosTable } from "./jogos.js";

export const avaliacoesTable = pgTable(
  "avaliacoes",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    jogoId: uuid("jogo_id")
      .notNull()
      .references(() => jogosTable.id, { onDelete: "cascade" }),

    nota: integer("nota").notNull(),

    comentario: text("comentario"), // opcional: dá pra avaliar só com nota

    createdAt: timestamp("created_at").notNull().defaultNow(),

    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // 1 avaliação por usuário por jogo
    uniqueIndex("avaliacoes_usuario_jogo_unique").on(
      table.usuarioId,
      table.jogoId
    ),
    // acelera GET /avaliacoes/jogo/:jogoId
    index("avaliacoes_jogo_idx").on(table.jogoId),
    // garante nota de 1 a 5 direto no banco
    check("avaliacoes_nota_check", sql`${table.nota} >= 1 AND ${table.nota} <= 5`),
  ]
);