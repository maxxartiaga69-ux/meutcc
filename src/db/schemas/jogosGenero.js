
import {
  pgTable,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { jogosTable } from "./jogos.js";
import { generosTable } from "./genero.js";

export const jogosGenerosTable = pgTable(
  "jogos_generos",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    jogoId: uuid("jogo_id")
      .notNull()
      .references(() => jogosTable.id, {
        onDelete: "cascade",
      }),

    generoId: uuid("genero_id")
      .notNull()
      .references(() => generosTable.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    uniqueIndex("jogos_generos_unique").on(
      table.jogoId,
      table.generoId
    ),
  ]
);
