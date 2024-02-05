import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    const user = jwt.verify(cookie, process.env.SECRET_JWT!);

    if (typeof user == "object") {
      res.locals.user = user;
      next();
    } else {
      res.send({ error: "Not authorized" }).status(401);
    }
  } else {
    res.send({ error: "Not authorized" }).status(401);
  }
};
