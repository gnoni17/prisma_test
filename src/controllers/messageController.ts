import { Message, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const data: Message = req.body;
  const me: User = res.locals.user;

  try {
    const message = await prisma.message.create({
      data: {
        chatId: Number(chatId),
        userId: me.id,
        message: data.message,
      },
    });

    res.send(message).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
