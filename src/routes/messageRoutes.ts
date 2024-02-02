import { Router } from "express";
import { createMessage } from "../controllers/messageController";

const router = Router();

router.post("/:chatId", createMessage);

export const messageRoutes = router;
