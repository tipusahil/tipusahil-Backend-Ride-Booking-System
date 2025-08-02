import { Router } from "express";
import { checkAuthMidddleware } from "../../middlewares/checkAuth.middleware";
import { checkRole_middleware } from "../../middlewares/checkRole.middleware";
import { Role } from "../user/user.interface";
import { driverControllers } from "./driver.controller";


export const  driverRouter : Router = Router();

driverRouter.patch("/availability",checkAuthMidddleware,checkRole_middleware(Role.driver),driverControllers.setAvailability);

driverRouter.get("/earnings", checkAuthMidddleware,checkRole_middleware(Role.driver), driverControllers.getEarnings);

driverRouter.patch("/approve/:id", checkAuthMidddleware, checkRole_middleware( Role.admin, Role.super_admin ),  driverControllers.approveDriver);