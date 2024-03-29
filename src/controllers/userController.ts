import { User } from "@prisma/client";
import { Request, Response } from "express";
import { toBase64 } from "../utils/convertImage";
import prisma from "@db/index";
import { logger } from "@utils/logger";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "desc",
      },
    });
    logger.info("get all users")

    res.send({ data: users }).status(200);
  } catch (error: any) {
    logger.error(error)
    res.json({ error }).status(500);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { bio }: User = req.body;
  const me = req.session.user!;

  try {
    const user = await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        bio,
        image: req.file ? toBase64(req.file.path) : null,
      },
    });
    logger.info("user updated")

    res.json({ data: user }).status(200);
  } catch (error: any) {
    logger.error(error)
    res.json({ error }).status(500);
  }
};
