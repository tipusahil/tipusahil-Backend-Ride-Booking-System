import { Router } from "express";
import { driverControllers } from "./driver.controller";
import { checkAuthMidddleware } from "../../middlewares/checkAuth.middleware";
import { checkRole_middleware } from "../../middlewares/checkRole.middleware";
import { Role } from "../user/user.interface";


export const  driverRouter : Router = Router();

driverRouter.patch("/availability",checkAuthMidddleware,checkRole_middleware(Role.driver,Role.super_admin),driverControllers.setAvailability);

driverRouter.patch("/accept/:id",checkAuthMidddleware,checkRole_middleware(Role.driver,Role.super_admin),driverControllers.acceptRide);

driverRouter.patch("/status/:id", checkAuthMidddleware,checkRole_middleware(Role.driver,Role.super_admin),  driverControllers.updateRideStatus);

driverRouter.get("/earnings", checkAuthMidddleware,checkRole_middleware(Role.driver,Role.super_admin), driverControllers.getEarnings)