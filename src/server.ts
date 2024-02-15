import moduleAlias from "module-alias";
import express from "express";
import cors from 'cors'
import session from 'express-session'
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { config } from 'dotenv'
config()

moduleAlias.addAliases({
  "@utils": `${__dirname}/utils`,
  "@routes": `${__dirname}/routes`,
  "@middlerware": `${__dirname}/middlerware`,
  "@controllers": `${__dirname}/controllers`,
  "@db": `${__dirname}/db`,
});

import db from './db/index'
import { userRoutes, chatRoutes, messageRoutes, authRoutes } from "@routes/index";
import { authMiddleware,sanitizeMiddleware, limiter, Authlimiter } from "@middlerware/index";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000, // ms
     secure: false
    },
    secret: process.env.SECRET_PASS!,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      db,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(sanitizeMiddleware)

// routes
app.use("/", Authlimiter, authRoutes);
app.use("/api/user", [authMiddleware, limiter], userRoutes);
app.use("/api/chat", [authMiddleware, limiter], chatRoutes);
app.use("/api/message", [authMiddleware, limiter], messageRoutes);

app.listen("8000", () => console.log("server is run"));
