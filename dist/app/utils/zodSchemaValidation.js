"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRequestSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
// export const registerSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   role: z.enum(['admin', 'rider', 'driver']),
// });
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.rideRequestSchema = zod_1.z.object({
    pickupLocation: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number(),
    }),
    destinationLocation: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number(),
    }),
});
