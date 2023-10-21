import { Router } from "express";
import {
  deleteUsers,
  updateUser,
  getUser,
  getUsers,
  deleteOneUser,
} from "../controllers/user.js";
const router = Router();

router.get("/user/:id", getUser);
router.get("/user", getUsers);
router.delete("/users", deleteUsers);
router.delete("/user/:id", deleteOneUser);
router.put("/user/:id", updateUser);

export default router;
