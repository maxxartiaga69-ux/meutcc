import {
  integer,
  pgTable,
  varchar,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const jogosTable = pgTable("jogos", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar().notNull(),

  image: varchar().notNull(),

  descricao: text(),

  anoLancamento: integer("ano_lancamento"),
});