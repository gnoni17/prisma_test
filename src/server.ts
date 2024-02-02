import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { chatRoutes } from "./routes/chatRoutes";
import { messageRoutes } from "./routes/messageRoutes";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

app.listen("8000", () => console.log(console.log("server is run")));
