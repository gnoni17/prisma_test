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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = exports.createChat = void 0;
const index_1 = __importDefault(require("@db/index"));
const index_2 = require("@utils/index");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds } = req.body;
    const me = req.session.user;
    if (!userIds || userIds.length == 0)
        return res.json({ error: "Nessun utente selezionato" }).status(400);
    try {
        const chat = yield index_1.default.chat.create({
            data: {
                users: {
                    connect: [
                        { id: me.id },
                        ...userIds === null || userIds === void 0 ? void 0 : userIds.map(id => ({ id }))
                    ],
                },
            },
        });
        index_2.logger.info("chat created");
        res.json({ data: chat }).status(201);
    }
    catch (error) {
        index_2.logger.error(error);
        res.send({ error }).status(500);
    }
});
exports.createChat = createChat;
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const me = req.session.user;
    try {
        const chats = yield index_1.default.chat.findMany({
            where: {
                users: {
                    some: {
                        id: {
                            equals: me.id,
                        },
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    take: -1,
                },
            },
            orderBy: {
                updatedAt: "desc"
            },
        });
        index_2.logger.info("get all chat");
        res.json({ data: chats }).status(200);
    }
    catch (error) {
        index_2.logger.error(error);
        res.json({ error }).status(500);
    }
});
exports.getAllChats = getAllChats;
