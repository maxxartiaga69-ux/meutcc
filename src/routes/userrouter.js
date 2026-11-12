import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  getImage,
} from "../controllers/usercontroller.js";

const router = Router();

router.post("/usuarios", createUser);
router.get("/", getAllUsers); // lista todos (sem :id)
router.get("/:id/imagem", getImage);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;