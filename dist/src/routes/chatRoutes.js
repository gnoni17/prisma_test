"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = require("express");
const chatController_1 = require("@controllers/chatController");
const router = (0, express_1.Router)();
router.get("/", chatController_1.getAllChats);
router.post("/", chatController_1.createChat);
exports.chatRoutes = router;
