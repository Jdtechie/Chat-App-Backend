import { Router } from "express";
import { createOrGetConversation } from "../controllers/conversation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createOrGetConversation);

export default router;
