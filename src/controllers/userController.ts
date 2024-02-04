import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: {
      username: "desc",
    },
  });

  res.send({ data: users }).status(200);
};

export const updateUser = async (req: Request, res: Response) => {
  const { data }: { data: User } = req.body;
  const me: User = res.locals.user;

  try {
    const user = await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        bio: data.bio,
      },
    });

    res.json({ data: user }).status(200);
  } catch (error) {
    res.json({ error }).status(500);
  }
};
