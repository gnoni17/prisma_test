"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = __importDefault(require("module-alias"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
module_alias_1.default.addAliases({
    "@utils": `${__dirname}/utils`,
    "@routes": `${__dirname}/routes`,
    "@middlerware": `${__dirname}/middlerware`,
    "@controllers": `${__dirname}/controllers`,
    "@db": `${__dirname}/db`,
});
const index_1 = __importDefault(require("./db/index"));
const index_2 = require("@routes/index");
const index_3 = require("@middlerware/index");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        secure: false
    },
    secret: process.env.SECRET_PASS,
    resave: true,
    saveUninitialized: true,
    store: new prisma_session_store_1.PrismaSessionStore(index_1.default, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    })
}));
app.use(index_3.sanitizeMiddleware);
// routes
app.use("/", index_3.Authlimiter, index_2.authRoutes);
app.use("/api/user", [index_3.authMiddleware, index_3.limiter], index_2.userRoutes);
app.use("/api/chat", [index_3.authMiddleware, index_3.limiter], index_2.chatRoutes);
app.use("/api/message", [index_3.authMiddleware, index_3.limiter], index_2.messageRoutes);
app.listen("8000", () => console.log("server is run"));
