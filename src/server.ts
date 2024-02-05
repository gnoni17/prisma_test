import express from "express";
import 'module-alias/register';
import { userRoutes, chatRoutes, messageRoutes, authRoutes } from "@routes/index";
import { authMiddleware } from "@middlerware/index";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/chat", authMiddleware, chatRoutes);
app.use("/api/message", authMiddleware, messageRoutes);

app.listen("8000", () => console.log(console.log("server is run")));
