import { Router } from "express";
import { getUsers, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.put("/:userId", updateUser);

export const userRoutes = router;
