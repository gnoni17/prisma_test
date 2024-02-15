import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import prisma from "@db/index";
import { logger } from "@utils/logger";

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!password || !username) return res.json({ error: "Inserisca tutti i campi" }).status(400);

  if (!validator.isStrongPassword(password))
    return res.send({ error: "La password non è abbstanza sicura" }).status(400);

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userExist = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (userExist) return res.send({ message: "Utente esistente" }).status(400)

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    req.session.user = { id: user.id, username: user.username };
    logger.info("User created");

    res.json({ ...user, password: null }).status(201);
  } catch (error: any) {
    logger.error(error);
    res.json({ error }).status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!password || !username) return res.json({ error: "Inserisca tutti i campi" }).status(400);

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      logger.info("User found");
      req.session.user = { id: user.id, username: user.username };
      const passwordIsEquel = await bcrypt.compare(password, user.password);

      if (!passwordIsEquel) return res.json({ error: "Password sbagliata" }).status(400);

      return res.json({ ...user, password: null }).status(200);
    } else {
      logger.info("User not found");
      return res.send({ error: "Utente non trovato" }).status(404);
    }
  } catch (error: any) {
    logger.error(error);
    res.json(error).status(500);
  }
};
