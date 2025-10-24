import { z } from 'zod';

// Mongoose-এর Role enum-এর অনুরূপ Zod enum তৈরি করা হলো
// Role enum-এর মানগুলো (যেমন 'driver', 'admin', 'rider') এখানে ব্যবহার হবে।
export const RoleEnum = z.enum(['driver', 'admin', 'rider']); // আপনার user.interface.ts ফাইল থেকে Role-এর মানগুলি এখানে বসান।


// 1. VehicleInfoSchema (nested schema)
const VehicleInfoSchemaZod = z.object({
  // vehicleType: { type: String, trim: true } - এটি ঐচ্ছিক (optional)
  vehicleType: z.string().trim().optional(),
  
  // licensePlate: { type: String, required: true, trim: true } - এটি আবশ্যক
  licensePlate: z.string().trim().min(1, 'License Plate is required.'),
}).strict(); // .strict() ব্যবহার করা হয়েছে যাতে শুধুমাত্র সংজ্ঞায়িত ফিল্ডগুলিই থাকে।

// 2. DriverInfoSchema (nested schema)
const DriverInfoSchemaZod = z.object({
  // vehicleInfo: { type: VehicleInfoSchema } - এটি আবশ্যক
  vehicleInfo: VehicleInfoSchemaZod,
  
  // isApproved, isOnline, earnings - এগুলি ঐচ্ছিক এবং ডিফল্ট মান আছে
  isApproved: z.boolean().default(false).optional(),
  isOnline: z.boolean().default(false).optional(),
  earnings: z.number().default(0).optional(),
}).strict(); // .strict() ব্যবহার করা হয়েছে যাতে শুধুমাত্র সংজ্ঞায়িত ফিল্ডগুলিই থাকে।

// 3. UserSchema (Main Schema)
export const registerZodSchema = z.object({
  // name: { type: String, required: true, trim: true }
  name: z.string().trim().min(3, 'Name is required.'),
  
  // email: { type: String, required: true, unique: true, trim: true }
  email: z.email('Invalid email format.').min(1, 'Email is required.'),
  
  // password: { type: String, required: true, trim: true }
  password: z.string().trim().min(6, 'Password must be at least 6 characters long.'),
  
  // role: { type: String, enum: Object.values(Role), required: true, lowercase: true, trim: true }
  role: RoleEnum.transform((val) => val.toLowerCase()), // lowercase করার জন্য transform ব্যবহার করা হলো
  
  // isBlocked: { type: Boolean, default: false } - ঐচ্ছিক
  isBlocked: z.boolean().default(false).optional(),
  
  // driverInfo: { type: [DriverInfoSchema], default: [] } - এটি array, তাই z.array ব্যবহার করা হলো
  driverInfo: z.array(DriverInfoSchemaZod).default([]).optional(),

}).strict() // .strict() ব্যবহার করা হয়েছে
// .superRefine() ব্যবহার করে শর্তসাপেক্ষ ভ্যালিডেশন (Conditional Validation) যুক্ত করা হলো
// এই অংশটি নিশ্চিত করবে যে role 'driver' হলে driverInfo অবশ্যই দিতে হবে।
.superRefine((data, ctx) => {
  if (data.role === 'driver') {
    // driverInfo আবশ্যক এবং array-এর মধ্যে অন্তত একটি entry থাকতে হবে।
    if (!data.driverInfo || data.driverInfo.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Driver registration requires driverInfo with at least one entry.',
        path: ['driverInfo'],
      });
    }
  }
});

// Zod Schema-এর TypeScript টাইপ বের করার জন্য
export type TRegisterUserZod = z.infer<typeof registerZodSchema>;