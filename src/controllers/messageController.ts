import { Message, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const data: Message = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        chatId: Number(chatId),
        userId: data.userId,
        message: data.message,
      },
    });

    res.send(message).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
