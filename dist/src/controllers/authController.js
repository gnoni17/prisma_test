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
exports.login = exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = require("../server");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || !username)
        return res.json({ error: "Inserisca tutti i campi" }).status(400);
    if (!validator_1.default.isStrongPassword(password))
        return res.send({ error: "La password non è abbstanza sicura" }).status(400);
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const user = yield server_1.prisma.user.create({
            data: {
                username,
                password: passwordHash,
            },
        });
        const token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { password: null }), process.env.SECRET_JWT);
        res.json({ token }).status(201);
    }
    catch (error) {
        console.log(error);
        res.json({ error }).status(500);
    }
});
exports.signin = signin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || !username)
        return res.json({ error: "Inserisca tutti i campi" }).status(400);
    try {
        const user = yield server_1.prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { password: null }), process.env.SECRET_JWT);
            const passwordIsEquel = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsEquel)
                return res.json({ error: "Password sbagliata" }).status(400);
            return res.json({ token }).status(200);
        }
        else {
            return res.send({ error: "Utente non trovato" }).status(404);
        }
    }
    catch (error) {
        res.json(error).status(500);
    }
});
exports.login = login;
