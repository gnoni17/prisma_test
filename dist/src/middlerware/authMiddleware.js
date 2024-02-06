"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        const user = jsonwebtoken_1.default.verify(cookie, process.env.SECRET_JWT);
        if (typeof user == "object") {
            res.locals.user = user;
            next();
        }
        else {
            res.send({ error: "Not authorized" }).status(401);
        }
    }
    else {
        res.send({ error: "Not authorized" }).status(401);
    }
};
exports.authMiddleware = authMiddleware;
