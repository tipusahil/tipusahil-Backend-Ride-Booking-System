import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { UserModel } from "./user.model";
import AppError from "../../ErrorHelpers/AppError/AppError";



// ------1. getAllUsers
const getAllUsers =  catchAsyncFunc( async (req:Request,res:Response) => { 

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
const blockUser =  catchAsyncFunc( async (req:Request,res:Response) => { 
  const userIdOrAdminId = req.params.id;
await UserModel.findByIdAndUpdate(userIdOrAdminId, { isBlocked : true});
  sendResponse(res, {
    success: true,
    statusCode:StatusCodes.OK,
    message:"user Blocked successfully",
    data:null,
  })
});



// -------3. updateUser
const updateUser =  catchAsyncFunc( async (req:Request,res:Response) => { 
  const userIdOrAdminId = req.params.id;

const result = await userServices.updateUser(req);
  sendResponse(res, {
    success: true,
    statusCode:StatusCodes.OK,
    message:"user data updated successfully",
    data : result,

  })
});


// -------4. getMe
const getMe =  catchAsyncFunc( async (req:Request,res:Response) => { 
const userId = req.user!.userId;
const result = await UserModel.findById(userId).select("-password");
if (!result) {
    throw new AppError(404, "User not found");
  }
// console.log(result)
// const {password, ...rest} = 
  sendResponse(res, {
    success: true,
    statusCode:StatusCodes.OK,
    message:"user data retrived successfully",
    data : result,

  })
});



// --------
export const userControllers = {
getAllUsers,
blockUser,
updateUser,
getMe
}