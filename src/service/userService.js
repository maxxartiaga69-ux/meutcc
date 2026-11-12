import { db } from "../db/index.js";
import { usersTable } from "../db/schemas/usuarios.js";
import { eq } from "drizzle-orm";

export const userService = {
  async createUser(userData) {
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: userData.name,
        email: userData.email,
        senha: userData.senha, // em produção, faça hash (bcrypt)
      })
      .returning();

    return newUser;
  },

  // NOVO: lista todos os usuários (sem expor a senha)
  async getAllUsers() {
    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable);

    return users;
  },

  async getUserById(id) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user || null;
  },

  async deleteUser(id) {
    const [deletedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return deletedUser || null;
  },

  async getImage(id) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user ? user.imagem ?? null : null;
  },
};