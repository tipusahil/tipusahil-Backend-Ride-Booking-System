import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { UserModel } from "./user.model";



// ------1. getAllUsers
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

// -------2. blockUser
const blockUser =  catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => { 
  const userIdOrAdminId = req.params.id;
await UserModel.findByIdAndUpdate(userIdOrAdminId, { isBlocked : true});
 res.json({ message: 'User blocked' });
});

// --------
export const userControllers = {
getAllUsers,
blockUser
}