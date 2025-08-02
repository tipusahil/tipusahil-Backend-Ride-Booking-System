import  bcryptjs  from 'bcryptjs';
import { JwtPayload } from "jsonwebtoken";
import { loginSchema } from "../../utils/zodSchemaValidation";
import { UserModel } from "../user/user.model";
import { StatusCodes } from "http-status-codes";

import { createUserTokens } from '../../utils/createUserTokens';
import { setAuthTokensToCookies } from '../../utils/setAuthTokensToCookies';
import { Response } from 'express';
import AppError from '../../ErrorHelpers/AppError/AppError';


const credentialLogin = async (res:Response, payload : Partial<JwtPayload> ) =>{

    
      const { email, password } = loginSchema.parse(payload);
      const user = await UserModel.findOne({ email });
      if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Does not Register!, please register first");
      }
      
      const isPasswordMatch = await bcryptjs.compare(password as string, user.password as string);
    
      if(!isPasswordMatch){
        throw new AppError(401, "Incorrect password!");
      }
    
      if (user.isBlocked) {
    throw new AppError(403, "Account is Blocked!");
      }
      
        const {  password : pass, ...rest } = payload;
    //   const tokens = createUserTokens(user) as JwtPayload;

      const tokens = createUserTokens(user);
    setAuthTokensToCookies(res,tokens);

  return  {
      accesstoken : tokens.accessToken,
      refreshtoken : tokens.refreshToken,
      user : rest
   
    }
  
}


export const authServices = {
    credentialLogin
}