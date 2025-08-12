import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from 'jsonwebtoken';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import { sendResponse } from '../../utils/sendResponse';
import { IUser } from '../user/user.interface';
import { userServices } from '../user/user.service';
import { authServices } from './auth.service';


// -----1.registerUser 
const registerUser = catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => {

    const payload = req.body;
    const result = await userServices.registerUser(res, payload as IUser);
   
    sendResponse(res, {
success: true,
    statusCode:StatusCodes.CREATED,
    message:result.message,
    data : {
      accesstoken :result.accessToken,
      refreshtoken :result.refreshToken,
      user : result.data,

    }
    })
    
});


// --------2. credentialLogin
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
    credentialLogin,
    registerUser
}