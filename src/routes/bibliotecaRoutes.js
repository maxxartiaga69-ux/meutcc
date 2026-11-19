
import { Router } from "express";

import {
  adicionarJogo,
  listarBiblioteca,
  atualizarStatus,
  removerJogo,
} from "../controllers/bibliotecaController.js";

// Importe seu middleware de autenticação aqui.
// Exemplo: import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Adicione o middleware de autenticação antes das rotas.
// router.use(authMiddleware);

router.post("/", adicionarJogo);

router.get("/", listarBiblioteca);

router.patch("/:jogoId", atualizarStatus);

router.delete("/:jogoId", removerJogo);

export default router;
