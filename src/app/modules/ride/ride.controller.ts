import { NextFunction, Request, Response } from "express"
import catchAsyncFunc from "../../utils/catchAsyncFunc"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { rideServices } from "./ride.service"
import { RideModel } from "./ride.model"
import AppError from "../../ErrorHelpers/AppError/AppError"


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

// ----------2.
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



// ----------
export const rideControllers = {
    requestRide,
    cancelRide,
    getRideHistory
}