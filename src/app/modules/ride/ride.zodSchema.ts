import z from "zod";

export const rideRequestSchema = z.object({
  pickupLocation: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  destinationLocation: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});