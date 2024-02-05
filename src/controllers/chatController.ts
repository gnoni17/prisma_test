import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createChat = async (req: Request, res: Response) => {
  const { userIds }: { userIds: number[] } = req.body;
  const me: User = res.locals.user;

  try {
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: me.id }, ...userIds.map((e) => ({ id: e }))],
        },
      },
    });
    res.json({ data: chat }).status(200);
  } catch (error) {
    console.log(error);
    res.send({ error }).status(500);
  }
};

export const getAllChats = async (req: Request, res: Response) => {
  const me: User = res.locals.user;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: {
              equals: me.id,
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
      },
    });
    res.json({ data: chats }).status(200);
  } catch (error) {
    res.json({ error }).status(500);
  }
};
