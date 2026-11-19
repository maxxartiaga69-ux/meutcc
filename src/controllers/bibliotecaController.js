
import { bibliotecaService } from "../service/bibliotecaService.js";

const statusPermitidos = [
  "zerado",
  "jogando",
  "desejado",
];

// ADICIONAR JOGO
export const adicionarJogo = async (req, res) => {
  try {
    const { jogoId } = req.body;
    const usuarioId = req.user.id;

    if (!jogoId) {
      return res.status(400).json({
        error: "O jogoId é obrigatório.",
      });
    }

    const jogo = await bibliotecaService.adicionarJogo(
      usuarioId,
      jogoId
    );

    if (!jogo) {
      return res.status(409).json({
        error: "Esse jogo já está na sua biblioteca.",
      });
    }

    return res.status(201).json({
      message: "Jogo adicionado à biblioteca!",
      jogo,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// LISTAR BIBLIOTECA
export const listarBiblioteca = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { status } = req.query;

    if (status && !statusPermitidos.includes(status)) {
      return res.status(400).json({
        error: "Status inválido.",
      });
    }

    const jogos = await bibliotecaService.listarBiblioteca(
      usuarioId,
      status
    );

    return res.status(200).json({
      total: jogos.length,
      jogos,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ATUALIZAR STATUS
export const atualizarStatus = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { jogoId } = req.params;
    const { status } = req.body;

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        error: "Status inválido.",
      });
    }

    const resultado = await bibliotecaService.atualizarStatus(
      usuarioId,
      jogoId,
      status
    );

    if (!resultado) {
      return res.status(404).json({
        error: "Jogo não encontrado na biblioteca.",
      });
    }

    return res.status(200).json({
      message: "Status atualizado com sucesso!",
      jogo: resultado,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// REMOVER JOGO
export const removerJogo = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { jogoId } = req.params;

    const removido = await bibliotecaService.removerJogo(
      usuarioId,
      jogoId
    );

    if (!removido) {
      return res.status(404).json({
        error: "Jogo não encontrado na biblioteca.",
      });
    }

    return res.status(200).json({
      message: "Jogo removido da biblioteca!",
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
