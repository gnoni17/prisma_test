import { Message, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "@db/index";

export const createMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const data: Message = req.body;
  const me: User = res.locals.user;

  if (!data.message) return res.json({ error: "Inserire un messaggio" }).status(400)

  try {
    const message = await prisma.message.create({
      data: {
        chatId: Number(chatId),
        userId: me.id,
        message: data.message,
      },
    });

    res.json({data: message}).status(200);
  } catch (error) {
    res.json({error}).status(500);
  }
};
