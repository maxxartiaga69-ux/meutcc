import { db } from "../db"; // Substitua pelo caminho onde sua instância 'db' foi configurada
import { usersTable } from "../db/schemas/usuarios.js"; // Substitua pelo caminho do seu schema
import { eq } from "drizzle-orm";

export const userService = {
  async createUser(userData) {
    // Insere o usuário e retorna o registro criado
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: userData.name,
        email: userData.email,
        senha: userData.senha, // Em produção, lembre-se de fazer o hash da senha antes!
      })
      .returning();

    return newUser;
  },

  async getUserById(id) {
    // Busca o usuário pelo ID
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return user || null;
  },

  async deleteUser(id) {
    // Deleta o usuário pelo ID e retorna o registro deletado (opcional)
    const [deletedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return deletedUser || null;
  },

  async getImage(id) {
    // Deleta o usuário pelo ID
    const [getImage] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
  }
};

