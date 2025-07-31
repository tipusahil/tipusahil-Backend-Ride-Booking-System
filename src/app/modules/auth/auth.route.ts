import { Router } from "express";
import { authControllers } from "./auth.controller";
import { ValidationRequestHandler_HigherFunc } from "../../middlewares/zodValidate_higherFunc.middleware";
import { loginSchema } from "../../utils/zodSchemaValidation";


export const  authRouter : Router = Router();

authRouter.post("/login",ValidationRequestHandler_HigherFunc(loginSchema), authControllers.credentialLogin)