import { Router } from "express";
import { createUser, getUsers, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:userId", updateUser);

export const userRoutes = router