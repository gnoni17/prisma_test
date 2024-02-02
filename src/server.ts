import express from "express";
import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(express.json());

// routes
app.use("/user", userRoutes)

// chat
app.get("/api/chat", async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
        include: {
            users: true,
        }
    });
    res.send(chats).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const chat = await prisma.chat.create({
      data: {},
    });

    const userOnChat = await prisma.usersOnChats.create({
      data: {
        chatId: chat.id,
        userId: 1,
        assignedBy: "gnoni",
      },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen("8000", () => console.log(console.log("server is run")));
