"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const vehicleInfo = new mongoose_1.Schema({
    vehicleType: { type: String, required: true, trim: true },
    licensePlate: { type: String, required: true, trim: true },
}, {
    versionKey: false,
    timestamps: true
});
const TDriverInfoSchema = new mongoose_1.Schema({
    vehicleInfo: { type: vehicleInfo },
    isApproved: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    earnings: { type: Number, default: 0 }
}, {
    versionKey: false,
    timestamps: true
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: Object.values(user_interface_1.Role), required: true, lowercase: true, trim: true }, //interface.ts file e Role ta enum type hote hbe.nahoi ekane import korar saggestion dibena.
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    driverInfo: { type: [TDriverInfoSchema], default: [] },
}, {
    versionKey: false,
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)("UserModel", userSchema, "user_collection");
