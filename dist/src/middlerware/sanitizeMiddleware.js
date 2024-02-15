"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMiddleware = void 0;
const validator_1 = __importDefault(require("validator"));
const sanitizeMiddleware = (req, res, next) => {
    function sanitize(obj) {
        if (typeof obj !== "object" || obj === null || Object.keys(obj).length == 0)
            throw new Error("Bad request");
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] !== null && typeof obj[key] === "object") {
                    obj[key] = sanitize(obj[key]);
                }
                else {
                    if (typeof obj[key] === "string") {
                        obj[key] = validator_1.default.escape(obj[key]);
                    }
                }
            }
        }
        return obj;
    }
    try {
        req.body = sanitize(req.body);
        next();
    }
    catch (error) {
        res.json({ error: error.message }).status(400);
    }
};
exports.sanitizeMiddleware = sanitizeMiddleware;
