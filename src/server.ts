import express from "express";
import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(express.json());

// routes
app.use("/api/user", userRoutes)
app.use("/api/chat", userRoutes)

app.listen("8000", () => console.log(console.log("server is run")));
