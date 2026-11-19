import { HttpError } from "../utils/httpError.js";

export function notFound(req, res) {
  return res.status(404).json({ error: "Rota não encontrada." });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON inválido." });
  }

  const code = err.code ?? err.cause?.code;

  if (code === "23505") {
    return res.status(409).json({ error: "Registro duplicado." });
  }

  if (code === "22P02") {
    return res.status(400).json({ error: "Identificador inválido." });
  }

  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor." });
}