import { Router } from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { authRequired } from "../middlewares/auth.js";
import { registerSchema, loginSchema } from "../validators/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authRequired, me);

export default router;