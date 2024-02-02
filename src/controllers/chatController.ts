import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createChat = async (req, res) => {
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
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        users: true,
      },
    });
    res.send(chats).status(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
