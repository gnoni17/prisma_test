import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!validator.isStrongPassword(password))
    return res.send({ message: "La password non è abbstanza sicura" }).status(400);

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    const token = jwt.sign({ user }, process.env.SECRET_JWT!);
    res.send({ token }).status(200);
  } catch (error) {
    res.send(error).status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      const token = jwt.sign({ user }, process.env.SECRET_JWT!);
      const passwordIsEquel = await bcrypt.compare(password, user.password);

      if (!passwordIsEquel) return res.send({ message: "Password sbagliata" }).status(400);

      return res.send({ token }).status(200);
    } else {
      return res.send({ message: "Utente non trovato" }).status(404);
    }
  } catch (error) {
    res.send(error).status(500);
  }
};
