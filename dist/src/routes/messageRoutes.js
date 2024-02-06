"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = require("express");
const messageController_1 = require("@controllers/messageController");
const router = (0, express_1.Router)();
router.post("/:chatId", messageController_1.createMessage);
exports.messageRoutes = router;
