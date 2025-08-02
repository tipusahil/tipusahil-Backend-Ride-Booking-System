import { Router } from "express";
import { checkAuthMidddleware } from "../../middlewares/checkAuth.middleware";
import { checkRole_middleware } from "../../middlewares/checkRole.middleware";
import { ValidationRequestHandler_HigherFunc } from "../../middlewares/zodValidate_higherFunc.middleware";
import { Role } from "../user/user.interface";
import { rideControllers } from "./ride.controller";
import { rideRequestSchema } from "./ride.zodSchema";

export const rideRouter : Router = Router();



rideRouter.post("/request",checkAuthMidddleware,checkRole_middleware(Role.rider), ValidationRequestHandler_HigherFunc(rideRequestSchema),rideControllers.requestRide);


rideRouter.patch("/accept/:id",checkAuthMidddleware,checkRole_middleware(Role.driver),rideControllers.acceptRide);

rideRouter.patch("/status/:id", checkAuthMidddleware,checkRole_middleware(Role.driver),  rideControllers.updateRideStatus);

rideRouter.patch("/cencel/:id" ,checkAuthMidddleware,checkRole_middleware(Role.rider),rideControllers.cancelRide);


rideRouter.get("/me", checkAuthMidddleware,checkRole_middleware(Role.rider) ,rideControllers.getRideHistory);

rideRouter.get("/", checkAuthMidddleware,checkRole_middleware(Role.admin, Role.super_admin) , rideControllers.getAllRides);
