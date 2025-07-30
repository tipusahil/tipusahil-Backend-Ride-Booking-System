import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import AppError from "../ErrorHelpers/AppError/AppError";

const authMiddleware = (req:Request,res:Response,next: NextFunction) =>{
const accessTokenFromHeaders = req.headers.authorization?.replace("Bearer ", "") || req.cookies.token;

if(!accessTokenFromHeaders) {
    throw new AppError(401,"No Token Provided to Headers.");
}

try {
    

    

} catch (error) {
    
}

}