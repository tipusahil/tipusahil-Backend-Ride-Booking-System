import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { UserModel } from "../user/user.model";
import AppError from "../../ErrorHelpers/AppError/AppError";
import { RideModel } from "../ride/ride.model";


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



// ---2. acceptRide 
const acceptRide  = catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {

  const ride = await RideModel.findById(req.params.id);
  if (!ride || ride.status !== 'requested') {
    return res.status(400).json({ message: 'Cannot accept ride' });
  }
  

  const driver = await UserModel.findById(req.user!.userId);

    const driverInfo = driver?.driverInfo?.[0];

  if (!driverInfo?.isApproved || !driverInfo?.isOnline) {
    return res.status(403).json({ message: 'Driver not authorized' });
  }
  ride.driver = req.user!.userId;
  ride.status = 'accepted';
  ride.statusHistory.push({ status: 'accepted' });
  await ride.save();

   res.json({ message: `Ride accepted` });
})

// -------3. updateRideStatus 
const updateRideStatus  =  catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {
    const userId = req.user!.userId
    const { status } = req.body;
    const idFromBody = req.body.id;
    const idFromParams = req.params.id;
    const ride = await RideModel.findById( req.params.id);

    if(!ride){
       throw new AppError(400, "ride not  found");
    }

    if(ride.driver?.toString() !== userId){
             throw new AppError(400, "invalid driver");
    }

 
    ride.status = status;
    ride.statusHistory.push({ status });
    if(status === "completed"){
        await UserModel.findByIdAndUpdate(userId, {
            $inc: { "driverInfo.0.earnings" : ride.fare }
        });
    }

    await ride.save();
     res.json({ message: 'Ride status updated' });
})

// ----------4. getEarnings


const getEarnings =  catchAsyncFunc( async (req: Request, res: Response, next:NextFunction) => {
const myId = req.user!.userId;
    const driver = await UserModel.findById(myId);
   res.json({ earnings: driver?.driverInfo?.[0]?.earnings });
});







// -----------
export const driverControllers = {
    setAvailability,
    acceptRide,
    updateRideStatus,
    getEarnings
}


