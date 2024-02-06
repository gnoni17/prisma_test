"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const server_1 = require("../server");
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const data = req.body;
    const me = res.locals.user;
    if (!data.message)
        return res.json({ error: "Inserire un messaggio" }).status(400);
    try {
        const message = yield server_1.prisma.message.create({
            data: {
                chatId: Number(chatId),
                userId: me.id,
                message: data.message,
            },
        });
        res.json({ data: message }).status(200);
    }
    catch (error) {
        res.json({ error }).status(500);
    }
});
exports.createMessage = createMessage;
