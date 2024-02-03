import { Router } from "express";
import { login, signin } from "../controllers/authController";

const router = Router();

router.post("/signin", signin);
router.post("/login", login);

export const authRoutes = router;
