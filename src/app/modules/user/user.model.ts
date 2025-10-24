import { model, Schema } from "mongoose";
import { IUser, Role, TDriverInfo, vehicleInfo as VehicleInfoType } from "./user.interface";

const VehicleInfoSchema = new Schema<VehicleInfoType>({
  vehicleType: { type: String, trim: true },
  licensePlate: { type: String, required: true, trim: true },
}, { timestamps: true });

const DriverInfoSchema = new Schema<TDriverInfo>({
  vehicleInfo: { type: VehicleInfoSchema },
  isApproved: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  earnings: { type: Number, default: 0 }
}, { timestamps: true });

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum: Object.values(Role), required: true, lowercase: true, trim: true },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  driverInfo: { type: [DriverInfoSchema], default: [] },
}, { timestamps: true });

export const UserModel = model("UserModel", userSchema, "user_collection");
