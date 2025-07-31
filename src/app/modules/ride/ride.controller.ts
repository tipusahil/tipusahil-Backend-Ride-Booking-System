import { NextFunction, Request, Response } from "express"
import catchAsyncFunc from "../../utils/catchAsyncFunc"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { rideServices } from "./ride.service"
import { RideModel } from "./ride.model"


const requestRide = catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const { pickupLocation, destinationLocation } = payload;
  const userId = req.user!.userId; // eta req.user e id jei name set kora hoise tik sei namei use korte hobe ekane,ahoi undifined dibe.
  console.log(payload,"rideController 12",userId);

  const ride = await RideModel.create({
    rider: userId,
    pickupLocation,
    destinationLocation,
    fare: 100, // Simplified fare
    statusHistory: [{ status: 'requested' }]
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Rider request successfully ✅",
    data: ride,
  });
});


export const rideControllers = {
    requestRide
}