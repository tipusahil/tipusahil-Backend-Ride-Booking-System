"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.rideRequestSchema = zod_1.default.object({
    pickupLocation: zod_1.default.object({
        lat: zod_1.default.number(),
        lng: zod_1.default.number(),
    }),
    destinationLocation: zod_1.default.object({
        lat: zod_1.default.number(),
        lng: zod_1.default.number(),
    }),
});
