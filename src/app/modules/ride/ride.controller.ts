import { NextFunction, Request, Response } from "express"
import catchAsyncFunc from "../../utils/catchAsyncFunc"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { rideServices } from "./ride.service"
import { RideModel } from "./ride.model"
import AppError from "../../ErrorHelpers/AppError/AppError"
import { UserModel } from "../user/user.model"

// --------1. requestRide
const requestRide = catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {

    const paylaod = req.body;

    const ride = await rideServices.requestRide(paylaod, req);

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Rider request successfully ✅",
        data: ride,
      });

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


// ----------4.cancelRide
const cancelRide = catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {


    const id = req.params.id;

    const ride = await rideServices.cancelRide(id, req);

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Rider cencel successfully ✅",
        data: null,
      });


});

// --------5.  getRideHistory
 const getRideHistory =catchAsyncFunc( async (req: Request, res: Response, next: NextFunction)=>{
      const rides = await RideModel.find({ rider: req.user!.userId });//  rider: req.user!.userId  ekane req.user.userId access korar smy keyal rakte hobe id diye save korcilm naki userId diye sei onujai name dite hobe.

  if(!rides){
throw new AppError(400,"rides history not found")
  }

  const totalRides = await RideModel.countDocuments();
  console.log(rides);

    res.status(200).json({
           success: true,
        statusCode: StatusCodes.OK,
        message: " all rides history",
        total: totalRides,
        history: rides,
    })
 })

// ------6. getAllRides

const getAllRides =catchAsyncFunc( async (req: Request, res: Response, next: NextFunction)=>{
  const allRides = await RideModel.find().lean();
  const totalRides =await RideModel.countDocuments();
      res.status(200).json({
           success: true,
        statusCode: StatusCodes.OK,
        message: " all rides",
       totalRides,
         allRides,
    })
 });

// ----------
export const rideControllers = {
    requestRide,
    acceptRide,
    updateRideStatus,
    cancelRide,
    getRideHistory,
    getAllRides
}