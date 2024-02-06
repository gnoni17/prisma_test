"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("@controllers/userController");
const index_1 = require("@utils/index");
const router = (0, express_1.Router)();
router.get("/", userController_1.getUsers);
router.put("/", index_1.upload.single("image"), userController_1.updateUser);
exports.userRoutes = router;