import { Router } from "express";
import { getProfile, updateMe, deleteMe } from "../controllers/usercontroller.js";
import { authRequired } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { updateProfileSchema } from "../validators/usuarios.js";

const router = Router();

router.patch("/me", authRequired, validate(updateProfileSchema), updateMe);
router.delete("/me", authRequired, deleteMe);
router.get("/:username", getProfile);

export default router;