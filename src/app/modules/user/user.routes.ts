import { Router } from "express";
import { userControllers } from "./user.controller";

export const userRouter: Router = Router();

userRouter.post("/create", userControllers.createUser);