"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideServices = void 0;
const ride_model_1 = require("./ride.model");
const AppError_1 = __importDefault(require("../../ErrorHelpers/AppError/AppError"));
const requestRide = (payload, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { pickupLocation, destinationLocation } = payload;
    const userId = req.user.userId; // eta req.user e id jei name set kora hoise tik sei namei use korte hobe ekane,ahoi undifined dibe.
    const existingRide = yield ride_model_1.RideModel.findOne({
        rider: userId,
        pickupLocation,
        destinationLocation,
        "statusHistory.0.status": "requested",
    });
    if (existingRide) {
        throw new AppError_1.default(400, "You already have a pending ride request for the same locations.");
    }
    const ride = yield ride_model_1.RideModel.create({
        rider: userId,
        pickupLocation,
        destinationLocation,
        fare: 100, // Simplified fare
        statusHistory: [{ status: "requested" }],
    });
    return ride;
});
// -------2.
const cancelRide = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.RideModel.findById(id);
    if (!ride) {
        throw new AppError_1.default(400, "Ride not found");
    }
    if (ride.rider.toString() !== req.user.userId) {
        throw new AppError_1.default(403, "You are not allowed to cancel this ride");
    }
    if (ride.status === "canceled") {
        throw new AppError_1.default(400, "This request is already canceled");
    }
    if (ride.status !== "requested") {
        throw new AppError_1.default(400, "Cannot cancel a ride that is not in 'requested' status");
    }
    ride.status = "canceled";
    ride.statusHistory.push({ status: "canceled" });
    yield ride.save(); // এইটিই সঠিক উপায়
    return true;
});
// --------
exports.rideServices = {
    requestRide,
    cancelRide,
};
