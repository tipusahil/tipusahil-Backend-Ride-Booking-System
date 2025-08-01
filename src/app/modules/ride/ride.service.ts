import { Request } from "express";
import { IRide } from "./ride.interface";
import { RideModel } from "./ride.model";
import { rideRequestSchema } from "./ride.zodSchema";
import AppError from "../../ErrorHelpers/AppError/AppError";

const requestRide = async (payload: Partial<IRide>, req: Request) => {
  const { pickupLocation, destinationLocation } = payload;
  const userId = req.user!.userId; // eta req.user e id jei name set kora hoise tik sei namei use korte hobe ekane,ahoi undifined dibe.

  const existingRide = await RideModel.findOne({
    rider: userId,
    pickupLocation,
    destinationLocation,
    "statusHistory.0.status": "requested",
  });

  if (existingRide) {
    throw new AppError(
      400,
      "You already have a pending ride request for the same locations."
    );
  }

  const ride = await RideModel.create({
    rider: userId,
    pickupLocation,
    destinationLocation,
    fare: 100, // Simplified fare
    statusHistory: [{ status: "requested" }],
  });

  return ride;
};

// -------2.
const cancelRide = async (id: string, req: Request) => {
  const ride = await RideModel.findById(id);

  if (!ride) {
    throw new AppError(400, "Ride not found");
  }

  if (ride.rider.toString() !== req.user!.userId) {
    throw new AppError(403, "You are not allowed to cancel this ride");
  }

  if (ride.status === "canceled") {
    throw new AppError(400, "This request is already canceled");
  }

  if (ride.status !== "requested") {
    throw new AppError(
      400,
      "Cannot cancel a ride that is not in 'requested' status"
    );
  }

  ride.status = "canceled";
  ride.statusHistory.push({ status: "canceled" });
  await ride.save(); // এইটিই সঠিক উপায়
  return true;
};

// --------
export const rideServices = {
  requestRide,
  cancelRide,
};
