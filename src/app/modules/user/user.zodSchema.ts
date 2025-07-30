import z from "zod";

// ei kajta utils folder e (zodSchemaValition.ts) file e kora jai.

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'rider', 'driver']),
});
