import { Router } from "express";
import { userControllers } from "./user.controller";
import { checkAuthMidddleware } from "../../middlewares/checkAuth.middleware";
import { checkRole_middleware } from "../../middlewares/checkRole.middleware";
import { Role } from "./user.interface";

export const userRouter: Router = Router();

userRouter.get("/",checkAuthMidddleware, checkRole_middleware( Role.admin, Role.super_admin), userControllers.getAllUsers);

userRouter.patch("/block/:id",checkAuthMidddleware, checkRole_middleware( Role.admin, Role.super_admin),userControllers.blockUser);
