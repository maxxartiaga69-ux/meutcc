import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(30)
      .regex(/^[a-z0-9_]+$/, "Use apenas letras, números e _.")
      .refine((v) => !["me", "admin", "api", "auth"].includes(v), "Username reservado.")
      .optional(),
    avatar: z.string().trim().url("Avatar precisa ser uma URL.").max(500).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie ao menos um campo para atualizar.",
  });