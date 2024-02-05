import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { prisma } from "../server";

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!password || !username) return res.json({ message: "Inserisca tutti i campi" }).status(400)

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

    const token = jwt.sign({ ...user, password: null }, process.env.SECRET_JWT!);
    res.json({ token }).status(201);
  } catch (error) {
    console.log(error);
    res.json({error}).status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!password || !username) return res.json({ message: "Inserisca tutti i campi" }).status(400)

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      const token = jwt.sign({ ...user, password: null }, process.env.SECRET_JWT!);
      const passwordIsEquel = await bcrypt.compare(password, user.password);

      if (!passwordIsEquel) return res.json({ message: "Password sbagliata" }).status(400);

      return res.json({ token }).status(200);
    } else {
      return res.send({ message: "Utente non trovato" }).status(404);
    }
  } catch (error) {
    res.json(error).status(500);
  }
};
