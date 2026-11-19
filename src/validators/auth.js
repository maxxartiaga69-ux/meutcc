import { z } from "zod";

const RESERVED = ["me", "admin", "api", "auth"];

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto.").max(100),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username precisa de 3+ caracteres.")
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Use apenas letras, números e _.")
    .refine((v) => !RESERVED.includes(v), "Username reservado."),
  email: z.string().trim().toLowerCase().email("E-mail inválido."),
  senha: z.string().min(8, "A senha precisa de 8+ caracteres.").max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido."),
  senha: z.string().min(1, "Senha obrigatória."),
});