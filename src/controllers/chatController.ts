import { Request, Response } from "express";
import prisma from "@db/index";
import { logger } from "@utils/index";

export const createChat = async (req: Request, res: Response) => {
  const { userIds }: { userIds: number[] } = req.body;
  const me = req.session.user!;

  if (!userIds || userIds.length == 0) return res.json({ error: "Nessun utente selezionato" }).status(400)

  try {
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: [
            { id: me.id }, 
            ...userIds?.map(id => ({ id }))
          ],
        },
      },
    });
    logger.info("chat created")
    res.json({ data: chat }).status(201);
  } catch (error: any) {
    logger.error(error)
    res.send({ error }).status(500);
  }
};

export const getAllChats = async (req: Request, res: Response) => {
  const me = req.session.user!;

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
    logger.info("get all chat")
    res.json({ data: chats }).status(200);
  } catch (error: any) {
    logger.error(error)
    res.json({ error }).status(500);
  }
};
