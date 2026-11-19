import { db } from "../db/index.js";
import { usersTable } from "../db/schemas/usuarios.js";
import { eq, and, ne } from "drizzle-orm";
import { HttpError } from "../utils/httpError.js";

// o que o PRÓPRIO usuário pode ver
export const selfFields = {
  id: usersTable.id,
  name: usersTable.name,
  username: usersTable.username,
  email: usersTable.email,
  avatar: usersTable.avatar,
  createdAt: usersTable.createdAt,
};

// o que QUALQUER pessoa pode ver (sem e-mail)
export const publicFields = {
  id: usersTable.id,
  name: usersTable.name,
  username: usersTable.username,
  avatar: usersTable.avatar,
  createdAt: usersTable.createdAt,
};

export const userService = {
  async getById(id) {
    const [user] = await db
      .select(selfFields)
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user || null;
  },

  async getByUsername(username) {
    const [user] = await db
      .select(publicFields)
      .from(usersTable)
      .where(eq(usersTable.username, username.toLowerCase()));

    return user || null;
  },

  async updateProfile(id, data) {
    if (data.username) {
      const [taken] = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(and(eq(usersTable.username, data.username), ne(usersTable.id, id)));

      if (taken) throw new HttpError(409, "Username já em uso.");
    }

    const [updated] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning(selfFields);

    return updated || null;
  },

  async deleteUser(id) {
    const [deleted] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    return deleted || null;
  },
};