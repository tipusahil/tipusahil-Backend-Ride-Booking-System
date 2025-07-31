import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { IUser } from "./user.interface";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const registerUser = catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => {


    const payload = req.body;
    const result = await userServices.registerUser(payload as IUser);
    sendResponse(res, {
success: true,
    statusCode:httpStatusCodes.CREATED,
    message:"user Register successfully",
    data :result.data,
    })
    
});

// --------
export const userControllers = {
registerUser,
}