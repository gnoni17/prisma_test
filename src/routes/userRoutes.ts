import { Router } from "express";
import { getUsers, updateUser } from "@controllers/userController";
import { upload } from "@utils/index";

const router = Router();

router.get("/", getUsers);
router.put("/", upload.single("image"), updateUser);

export const userRoutes = router;
