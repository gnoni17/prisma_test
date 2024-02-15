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
const index_1 = __importDefault(require("@db/index"));
const logger_1 = require("@utils/logger");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || !username)
        return res.json({ error: "Inserisca tutti i campi" }).status(400);
    if (!validator_1.default.isStrongPassword(password))
        return res.send({ error: "La password non è abbstanza sicura" }).status(400);
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const userExist = yield index_1.default.user.findUnique({
            where: {
                username
            }
        });
        if (userExist)
            return res.send({ message: "Utente esistente" }).status(400);
        const user = yield index_1.default.user.create({
            data: {
                username,
                password: passwordHash,
            },
        });
        req.session.user = { id: user.id, username: user.username };
        logger_1.logger.info("User created");
        res.json(Object.assign(Object.assign({}, user), { password: null })).status(201);
    }
    catch (error) {
        logger_1.logger.error(error);
        res.json({ error }).status(500);
    }
});
exports.signin = signin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || !username)
        return res.json({ error: "Inserisca tutti i campi" }).status(400);
    try {
        const user = yield index_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (user) {
            logger_1.logger.info("User found");
            req.session.user = { id: user.id, username: user.username };
            const passwordIsEquel = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsEquel)
                return res.json({ error: "Password sbagliata" }).status(400);
            return res.json(Object.assign(Object.assign({}, user), { password: null })).status(200);
        }
        else {
            logger_1.logger.info("User not found");
            return res.send({ error: "Utente non trovato" }).status(404);
        }
    }
    catch (error) {
        logger_1.logger.error(error);
        res.json(error).status(500);
    }
});
exports.login = login;
