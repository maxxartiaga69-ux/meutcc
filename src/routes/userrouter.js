import express from 'express'
import { Router } from "express";
import { createUser, getUser, deleteUser, getImage } from "../controllers/usercontroller.js";

const router = Router();

// Rotas REST para usuários
router.post("/users", createUser);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", getImage);

export default router;