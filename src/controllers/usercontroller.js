import { userService } from "../service/userService.js";
import { clearAuthCookie } from "../utils/cookies.js";

// GET /usuarios/:username  (público)
export const getProfile = async (req, res, next) => {
  try {
    const usuario = await userService.getByUsername(req.params.username);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
};

// PATCH /usuarios/me  (logado)
export const updateMe = async (req, res, next) => {
  try {
    const usuario = await userService.updateProfile(req.user.id, req.body);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Perfil atualizado!", usuario });
  } catch (error) {
    next(error);
  }
};

// DELETE /usuarios/me  (logado)
export const deleteMe = async (req, res, next) => {
  try {
    const removido = await userService.deleteUser(req.user.id);

    if (!removido) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    clearAuthCookie(res);
    return res.status(200).json({ message: "Conta deletada com sucesso!" });
  } catch (error) {
    next(error);
  }
};