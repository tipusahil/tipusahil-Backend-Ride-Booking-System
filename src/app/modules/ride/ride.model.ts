import { model, Schema } from "mongoose";
import { IRide } from "./ride.interface";

const rideSchema = new Schema<IRide>({
  rider: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "UserModel" },
  pickupLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  destinationLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: [
      "requested",
      "accepted",
      "picked_up",
      "in_transit",
      "completed",
      "canceled",
    ],
    default: "requested",
  },
  fare: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  statusHistory: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
},
{
  versionKey: false,
  timestamps: true
}
);

export const RideModel = model<IRide>("Ride", rideSchema, "Ride_collection");
