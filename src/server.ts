import { configServer } from "./config";
configServer();

import express from "express";
import cors from 'cors'
import { userRoutes, chatRoutes, messageRoutes, authRoutes } from "@routes/index";
import { authMiddleware } from "@middlerware/index";
import { sanitizeMiddleware } from "@middlerware/sanitizeMiddleware";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(sanitizeMiddleware)

// routes
app.use("/", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/chat", authMiddleware, chatRoutes);
app.use("/api/message", authMiddleware, messageRoutes);

app.listen("8000", () => console.log("server is run"));
