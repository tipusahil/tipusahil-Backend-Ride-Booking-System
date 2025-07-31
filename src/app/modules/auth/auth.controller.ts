import  bcryptjs  from 'bcryptjs';
import { StatusCodes } from "http-status-codes";
import AppError from "../../ErrorHelpers/AppError/AppError";
import { UserModel } from "../user/user.model";
import { createUserTokens } from '../../utils/createUserTokens';
import { IUser } from '../user/user.interface';
import { JwtPayload } from 'jsonwebtoken';
import { setAuthTokensToCookies } from '../../utils/setAuthTokensToCookies';
import { loginSchema } from '../../utils/zodSchemaValidation';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import { authServices } from './auth.service';

export const credentialLogin = catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {
const payload = req.body;
const result = await authServices.credentialLogin(res, payload as JwtPayload);
if(result){
  
}

      sendResponse(res, {
    success: true,
    statusCode:StatusCodes.OK,
    message:"User Logged In Successfully✅",
    data : {
      accesstoken :result.accesstoken,
      refreshtoken :result.refreshtoken,
      user : result.user

    }

  })
}
);

export const authControllers = {
    credentialLogin
}