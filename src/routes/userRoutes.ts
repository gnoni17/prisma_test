import { Router } from "express";
import { createUser, getAll } from "../controllers/userController";

const router = Router();

router.get("/", getAll);
router.post("/", createUser);

export const userRoutes = router