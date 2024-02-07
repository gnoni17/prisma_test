import { configServer } from "./config";
configServer();

import express from "express";
import cors from 'cors'
import { userRoutes, chatRoutes, messageRoutes, authRoutes } from "@routes/index";
import { authMiddleware,sanitizeMiddleware, limiter, Authlimiter } from "@middlerware/index";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(sanitizeMiddleware)

// routes
app.use("/", Authlimiter, authRoutes);
app.use("/api/user", [authMiddleware, limiter], userRoutes);
app.use("/api/chat", [authMiddleware, limiter], chatRoutes);
app.use("/api/message", [authMiddleware, limiter], messageRoutes);

app.listen("8000", () => console.log("server is run"));
