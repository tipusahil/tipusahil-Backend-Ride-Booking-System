import { Request } from "express";
import { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";
import { rideRequestSchema } from "./ride.zodSchema";


const requestRide =async (payload : Partial<IRide>, req:Request) =>{

//  const { pickupLocation, destinationLocation } = rideRequestSchema.parse(payload);
 const { pickupLocation, destinationLocation } = payload;


//  const ride = await RideModel.create(payload);

 const ride = new RideModel({
    rider: req.user!._id,
    pickupLocation,
    destinationLocation,
    fare: 100, // Simplified fare
    statusHistory: [{ status: 'requested' }],
  })

  await ride.save();

  return ride
}

export const rideServices = {
requestRide
}