import  httpStatusCodes  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { IUser } from "./user.interface";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => {


    const payload = req.body;
    const result = await userServices.createUser(payload as IUser);
    sendResponse(res, {
success: true,
    statusCodeT:httpStatusCodes.OK,
    message:"user created successfully",
    data :result.data,
    })
    
});

// --------
export const userControllers = {
createUser,
}