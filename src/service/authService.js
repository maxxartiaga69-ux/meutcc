import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq, or } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schemas/usuarios.js";
import { selfFields } from "./userService.js";
import { HttpError } from "../utils/httpError.js";

export const authService = {
  async register({ name, username, email, senha }) {
    const [existing] = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(or(eq(usersTable.email, email), eq(usersTable.username, username)))
      .limit(1);

    if (existing) {
      throw new HttpError(
        409,
        existing.email === email ? "E-mail já cadastrado." : "Username já em uso."
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ name, username, email, senha: senhaHash })
      .returning(selfFields);

    return user;
  },

  async login({ email, senha }) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    const senhaCorreta = user ? await bcrypt.compare(senha, user.senha) : false;

    if (!senhaCorreta) {
      // mesma mensagem para e-mail errado e senha errada (não revela quais e-mails existem)
      throw new HttpError(401, "E-mail ou senha inválidos.");
    }

    const { senha: _senha, ...usuario } = user;
    return usuario;
  },

  generateToken(userId) {
    return jwt.sign({}, process.env.JWT_SECRET, {
      subject: userId,
      expiresIn: "7d",
    });
  },
};