import { authService } from "../service/authService.js";
import { userService } from "../service/userService.js";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies.js";

export const register = async (req, res, next) => {
  try {
    const usuario = await authService.register(req.body);
    setAuthCookie(res, authService.generateToken(usuario.id));

    return res.status(201).json({ message: "Conta criada com sucesso!", usuario });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const usuario = await authService.login(req.body);
    setAuthCookie(res, authService.generateToken(usuario.id));

    return res.status(200).json({ message: "Login realizado!", usuario });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logout realizado." });
};

export const me = async (req, res, next) => {
  try {
    const usuario = await userService.getById(req.user.id);

    if (!usuario) {
      clearAuthCookie(res);
      return res.status(401).json({ error: "Usuário não existe mais." });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
};