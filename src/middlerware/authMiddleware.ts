import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    const data = jwt.verify(cookie, process.env.SECRET_JWT!);

    if (typeof data == "object") {
      res.locals.user = data.user;
      next();
    } else {
      res.send({ message: "Not authorized" }).status(401);
    }
  } else {
    res.send({ message: "Not authorized" }).status(401);
  }
};
