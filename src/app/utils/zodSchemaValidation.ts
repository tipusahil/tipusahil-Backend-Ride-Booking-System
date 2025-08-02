import { z } from 'zod';

// export const registerSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   role: z.enum(['admin', 'rider', 'driver']),
// });

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

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
