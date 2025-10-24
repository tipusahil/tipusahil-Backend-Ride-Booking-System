import  httpStatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";

import { UserModel } from "../modules/user/user.model";
import { tokenVerifier } from "../utils/jwt";
import AppError from '../ErrorHelpers/AppError/AppError';

export const checkAuthMidddleware =async (req:Request,res:Response,next: NextFunction) =>{
const accessTokenFromHeadersOrCookies =await req.cookies.accessToken;
console.log(accessTokenFromHeadersOrCookies);

if(!accessTokenFromHeadersOrCookies) {
    throw new AppError(401,"No accessToken Provided to cookies or headers");
}

try {
    

const VerifiedToken = tokenVerifier(accessTokenFromHeadersOrCookies, envVars.JWT_ACCESS_SECRET_SIGNATURE) as JwtPayload & { userId: string; role: string,email:string };

req.user = VerifiedToken;

    if(envVars.NODE_ENV ==="development"){
            console.log("verified token: ",VerifiedToken) // varified token er payload dekabe, jegulo diye jwtPayload dewa hoisilo
    }

// const isUserExist = await UserModel.findById(req.user.id)
const isUserExist = await UserModel.findOne({ email : VerifiedToken.email });
if( !isUserExist ){ 
throw new AppError(httpStatusCodes.BAD_REQUEST , "User Does Not Exist!");
}

if(isUserExist.isBlocked){
throw new AppError(httpStatusCodes.BAD_REQUEST , "User is Blocked!");
}


next();

} catch (error) {
    next(error)
}

}