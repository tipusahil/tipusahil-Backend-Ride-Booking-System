"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideModel = void 0;
const mongoose_1 = require("mongoose");
const rideSchema = new mongoose_1.Schema({
    rider: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel", required: true },
    driver: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
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
}, {
    versionKey: false,
    timestamps: true
});
exports.RideModel = (0, mongoose_1.model)("Ride", rideSchema, "Ride_collection");
