import { Router } from "express";
import { sendMessage,
    getMessagesByConversation,

 } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:conversationId", authMiddleware, getMessagesByConversation);

export default router;
