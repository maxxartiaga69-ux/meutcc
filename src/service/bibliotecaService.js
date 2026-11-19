
import { db } from "../db/index.js";
import { bibliotecaTable } from "../db/schemas/biblioteca.js";
import { jogosTable } from "../db/schemas/jogos.js";

import { eq, and } from "drizzle-orm";

export const bibliotecaService = {

  // ADICIONAR JOGO
  async adicionarJogo(usuarioId, jogoId) {
    const resultado = await db
      .insert(bibliotecaTable)
      .values({
        usuarioId,
        jogoId,
        status: "desejado",
      })
      .onConflictDoNothing()
      .returning();

    return resultado[0] || null;
  },

  // LISTAR BIBLIOTECA
  async listarBiblioteca(usuarioId, status) {
    const conditions = [
      eq(bibliotecaTable.usuarioId, usuarioId),
    ];

    if (status) {
      conditions.push(
        eq(bibliotecaTable.status, status)
      );
    }

    return await db
      .select({
        id: bibliotecaTable.id,
        jogoId: bibliotecaTable.jogoId,
        status: bibliotecaTable.status,
        createdAt: bibliotecaTable.createdAt,
        jogo: jogosTable,
      })
      .from(bibliotecaTable)
      .innerJoin(
        jogosTable,
        eq(bibliotecaTable.jogoId, jogosTable.id)
      )
      .where(and(...conditions));
  },

  // ATUALIZAR STATUS
  async atualizarStatus(usuarioId, jogoId, status) {
    const resultado = await db
      .update(bibliotecaTable)
      .set({ status })
      .where(
        and(
          eq(bibliotecaTable.usuarioId, usuarioId),
          eq(bibliotecaTable.jogoId, jogoId)
        )
      )
      .returning();

    return resultado[0] || null;
  },

  // REMOVER JOGO
  async removerJogo(usuarioId, jogoId) {
    const resultado = await db
      .delete(bibliotecaTable)
      .where(
        and(
          eq(bibliotecaTable.usuarioId, usuarioId),
          eq(bibliotecaTable.jogoId, jogoId)
        )
      )
      .returning();

    return resultado.length > 0;
  },

};
