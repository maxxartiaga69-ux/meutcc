import { userService } from "../service/userService.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, senha } = req.body;

    if (!name || !email || !senha) {
      return res
        .status(400)
        .json({ error: "name, email e senha são obrigatórios." });
    }

    const usuario = await userService.createUser({ name, email, senha });
    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", usuario });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// NOVO
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await userService.getAllUsers();
    return res.status(200).json({
      total: usuarios.length,
      usuarios,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const usuario = await userService.getUserById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const removido = await userService.deleteUser(req.params.id);
    if (!removido) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const imagem = await userService.getImage(req.params.id);
    return res.status(200).json({ imagem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};