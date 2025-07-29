import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";


const globalErrorHandler =async ( err: any, req : Request, res : Response, next : NextFunction ) =>{


    if(envVars.NODE_ENV ==="development"){
        console.log(`error is:`, err);
    }

 // ------------------------

 let errorSourcesArray = [
    
 ]

}

export default globalErrorHandler;