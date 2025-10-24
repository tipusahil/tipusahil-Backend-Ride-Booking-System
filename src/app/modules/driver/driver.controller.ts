import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { UserModel } from "../user/user.model";
import AppError from "../../ErrorHelpers/AppError/AppError";
import { RideModel } from "../ride/ride.model";

// -----------1. setAvailability
const setAvailability  = catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {
const { isOnline} = req.body;


const userId = req.user!.userId;
const user = await UserModel.findById(userId);
if (!user) {
  throw new AppError(404, "User not found");
}
  if (!user.driverInfo?.length) {
    // 🟡 (!user.driverInfo?.length) = "user-এর কোনো driverInfo এখনো নেই বা সেটি ফাঁকা, তাহলে..."
    // “যদি user.driverInfo না থাকে বা থাকে কিন্তু empty হয়, তাহলে এই block এ ঢুকো।”
    throw new AppError(400, "Driver info not found. Please register vehicle information first.");
  }

  // update only isOnline field in the first driverInfo object
  user.driverInfo[0].isOnline = isOnline;

console.log(user.driverInfo[0].isOnline)
console.log(isOnline)
await user.save();


 res.json({ message: `Availability updated` });
});


// ----------2. getEarnings
const getEarnings =  catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {
const myId = req.user!.userId;
    const driver = await UserModel.findById(myId);
   res.json({ earnings: driver?.driverInfo?.[0]?.earnings });
});


// -------------3. approveDriver

const approveDriver = catchAsyncFunc( async (req:Request,res:Response,next:NextFunction) => { 
const userOrDriverId = req.params.id;
const approveDriver = await UserModel.findByIdAndUpdate(userOrDriverId, { "driverInfo.[0].isApproved" : true } )

  res.status(200).json({status: 200, success:true, message: ' Driver approved✅ ' });
} );




// -----------
export const driverControllers = {
    setAvailability,
    getEarnings,
    approveDriver
}


