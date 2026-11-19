import {
  pgTable,
  varchar,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const generosTable = pgTable(
  "generos",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    name: varchar().notNull(),
  },
  (table) => [
    uniqueIndex("generos_name_unique").on(table.name),
  ]
);
