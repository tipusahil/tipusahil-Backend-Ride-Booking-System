import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env";

type childFunc = (req:Request,res:Response,next:NextFunction) => Promise<any | void> ;

const catchAsyncFunc = (childFunc : childFunc) =>  (req:Request,res:Response,next:NextFunction) => {
    Promise.resolve( childFunc(req,res,next) ).catch(
        
        (err:any)=>{
         
        if(envVars.NODE_ENV==='development'){
            console.log(err)
        }

        next(err)
    })
};

export default catchAsyncFunc;