import { integer, pgTable, varchar, uuid,} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"

export const usersTable = pgTable("gostei", {
  id: uuid().primaryKey().default(sql`gen_random_uuid()`),
  Image: varchar().notNull(),
  name: varchar().notNull()
});
