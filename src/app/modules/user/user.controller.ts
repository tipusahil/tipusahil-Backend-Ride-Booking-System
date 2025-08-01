import  httpStatusCodes, { StatusCodes }  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { IUser } from "./user.interface";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { UserModel } from './user.model';
import { QueryBuilder } from '../../utils/QueryBuilder';


// -----1.registerUser 

const registerUser = catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => {

    const payload = req.body;
    const result = await userServices.registerUser(res, payload as IUser);
    sendResponse(res, {
success: true,
    statusCode:httpStatusCodes.CREATED,
    message:result.message,
    data :result.data,
    })
    
});

// ------2. 
const getAllUsers =  catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => { 

    const query = req.query

   
// const users = await userServices.getAllUsers( query : Record<string, string>);// ❌
const users =await userServices.getAllUsers( query as Record<string, string>); //✅ (as) use hobe (:) clone na

  sendResponse(res, {
    success: true,
    statusCode:StatusCodes.OK,
    message:"all users Retrieved successfully",
    data : users.data,
    meta: users.meta

  })

});





// --------
export const userControllers = {
registerUser,
getAllUsers
}