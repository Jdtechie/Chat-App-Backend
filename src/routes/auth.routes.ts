import { Router } from "express";
import { login, register, getAllUsers } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUser", getAllUsers );

export default router;
