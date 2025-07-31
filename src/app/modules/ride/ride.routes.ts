import { Router } from "express";
import { rideControllers } from "./ride.controller";
import { checkRole_middleware } from "../../middlewares/checkRole.middleware";
import { Role } from "../user/user.interface";
import { checkAuthMidddleware } from "../../middlewares/checkAuth.middleware";
import { ValidationRequestHandler_HigherFunc } from "../../middlewares/zodValidate_higherFunc.middleware";
import { rideRequestSchema } from "./ride.zodSchema";

export const rideRouter : Router = Router();


rideRouter.post("/request",checkAuthMidddleware,checkRole_middleware(...Object.values(Role)), ValidationRequestHandler_HigherFunc(rideRequestSchema),rideControllers.requestRide);
