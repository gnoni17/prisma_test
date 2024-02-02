import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async (req, res) => {
  const user = await prisma.user.findMany({
    orderBy: {
      username: "desc",
    },
  });

  res.send(user).status(200);
};

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: "gnoni",
      password: "123456789",
    },
  });

  res.send(user).status(200);
};
