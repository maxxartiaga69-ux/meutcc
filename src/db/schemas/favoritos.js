import { integer, pgTable, varchar, uuid,} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"

export const usersTable = pgTable("favoritos", {
  id: uuid().primaryKey().default(sql`gen_random_uuid()`),
  name: varchar().notNull(),

});