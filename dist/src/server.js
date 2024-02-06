"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const config_1 = require("./config");
(0, config_1.configServer)();
const express_1 = __importDefault(require("express"));
const index_1 = require("@routes/index");
const index_2 = require("@middlerware/index");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient({ log: ["error"] });
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/", index_1.authRoutes);
app.use("/api/user", index_2.authMiddleware, index_1.userRoutes);
app.use("/api/chat", index_2.authMiddleware, index_1.chatRoutes);
app.use("/api/message", index_2.authMiddleware, index_1.messageRoutes);
app.listen("8000", () => console.log("server is run"));
