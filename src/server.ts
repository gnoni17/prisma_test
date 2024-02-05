import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { chatRoutes } from "./routes/chatRoutes";
import { messageRoutes } from "./routes/messageRoutes";
import { authRoutes } from "./routes/authRoutes";
import { authMiddleware } from "./middlerware/authMiddleware";

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
