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
exports.updateUser = exports.getUsers = void 0;
const convertImage_1 = require("../utils/convertImage");
const server_1 = require("../server");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield server_1.prisma.user.findMany({
            orderBy: {
                username: "desc",
            },
        });
        res.send({ data: users }).status(200);
    }
    catch (error) {
        res.json({ error }).status(500);
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bio } = req.body;
    const me = res.locals.user;
    try {
        const user = yield server_1.prisma.user.update({
            where: {
                id: me.id,
            },
            data: {
                bio,
                image: req.file ? (0, convertImage_1.toBase64)(req.file.path) : null,
            },
        });
        res.json({ data: user }).status(200);
    }
    catch (error) {
        console.log(error);
        res.json({ error }).status(500);
    }
});
exports.updateUser = updateUser;
