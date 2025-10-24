import { Router } from "express";
import { ValidationRequestHandler_HigherFunc } from "../../middlewares/zodValidate_higherFunc.middleware";
import { loginSchema } from "../../utils/zodSchemaValidation";
import { authControllers } from "./auth.controller";
import { registerZodSchema } from "../user/user.zodSchema";


export const  authRouter : Router = Router();

authRouter.post("/register",ValidationRequestHandler_HigherFunc(registerZodSchema), authControllers.registerUser);


authRouter.post("/login",ValidationRequestHandler_HigherFunc(loginSchema), authControllers.credentialLogin)
authRouter.post("/logout", authControllers.logout)