import  httpStatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../ErrorHelpers/AppError/AppError";
import { UserModel } from "../modules/user/user.model";
import { tokenVerifier } from "../utils/jwt";

export const checkAuthMidddleware =async (req:Request,res:Response,next: NextFunction) =>{
const accessTokenFromHeaders = req.headers.authorization?.replace("Bearer ", "") || req.cookies.token;

if(!accessTokenFromHeaders) {
    throw new AppError(401,"No Token Provided to Headers.");
}

try {
    

const VerifiedToken = tokenVerifier(accessTokenFromHeaders, envVars.JWT_ACCESS_SECRET_SIGNATURE) as JwtPayload & { userId: string; role: string };

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