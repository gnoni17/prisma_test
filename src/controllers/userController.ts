import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: {
      username: "desc",
    },
  });

  res.send(users).status(200);
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { data }: { data: User } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        bio: data.bio,
      },
    });

    res.send(user).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};
