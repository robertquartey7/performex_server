import { Router } from "express";
import { checkForUser } from "../helpers/validation.js";
import { register, login } from "../controllers/authentication.js";
const router = Router();

router.post("/register", checkForUser, register);
router.post("/login", login);

export default router;
