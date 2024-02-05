import { Router } from "express";
import { createChat, getAllChats } from "@controllers/chatController";

const router = Router();

router.get("/", getAllChats);
router.post("/", createChat);

export const chatRoutes = router;
