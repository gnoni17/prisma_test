import validator from "validator";
import { NextFunction, Request, Response } from "express";

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  function sanitize(obj: any) {
    if (typeof obj !== "object" || obj === null || Object.keys(obj).length == 0) throw new Error("Bad request");

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== null && typeof obj[key] === "object") {
          obj[key] = sanitize(obj[key]);
        } else {
          if (typeof obj[key] === "string") {
            obj[key] = validator.escape(obj[key]);
          }
        }
      }
    }

    return obj;
  }

  try {
    req.body = sanitize(req.body);
    next();
  } catch (error: any) {
    res.json({ error: error.message }).status(400);
  }
};
