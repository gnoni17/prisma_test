"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.send({ error: "Not authorized" }).status(401);
    }
};
exports.authMiddleware = authMiddleware;
