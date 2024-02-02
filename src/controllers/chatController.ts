import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createChat = async (req: Request, res: Response) => {
  const { userIds }: { userIds: number[] } = req.body;

  try {
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: userIds[0] }, { id: userIds[1] }],
        },
      },
    });
    res.send(chat).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

export const getAllChats = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: {
              equals: Number(userId),
            },
          },
        },
      },
      include: {
        users: true,
        messages: {
          take: -1,
        },
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
    res.send(chats).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
