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
exports.rideControllers = void 0;
const catchAsyncFunc_1 = __importDefault(require("../../utils/catchAsyncFunc"));
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const ride_service_1 = require("./ride.service");
const ride_model_1 = require("./ride.model");
const AppError_1 = __importDefault(require("../../ErrorHelpers/AppError/AppError"));
const user_model_1 = require("../user/user.model");
// --------1. requestRide
const requestRide = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paylaod = req.body;
    const ride = yield ride_service_1.rideServices.requestRide(paylaod, req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Rider request successfully ✅",
        data: ride,
    });
}));
// ---2. acceptRide 
const acceptRide = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.RideModel.findById(req.params.id);
    if (!ride || ride.status !== 'requested') {
        return res.status(400).json({ message: 'Cannot accept ride' });
    }
    const driver = yield user_model_1.UserModel.findById(req.user.userId);
    const driverInfo = (_a = driver === null || driver === void 0 ? void 0 : driver.driverInfo) === null || _a === void 0 ? void 0 : _a[0];
    if (!(driverInfo === null || driverInfo === void 0 ? void 0 : driverInfo.isApproved) || !(driverInfo === null || driverInfo === void 0 ? void 0 : driverInfo.isOnline)) {
        return res.status(403).json({ message: 'Driver not authorized' });
    }
    ride.driver = req.user.userId;
    ride.status = 'accepted';
    ride.statusHistory.push({ status: 'accepted' });
    yield ride.save();
    res.json({ message: `Ride accepted` });
}));
// -------3. updateRideStatus 
const updateRideStatus = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user.userId;
    const { status } = req.body;
    const idFromBody = req.body.id;
    const idFromParams = req.params.id;
    const ride = yield ride_model_1.RideModel.findById(req.params.id);
    if (!ride) {
        throw new AppError_1.default(400, "ride not  found");
    }
    if (((_a = ride.driver) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
        throw new AppError_1.default(400, "invalid driver");
    }
    ride.status = status;
    ride.statusHistory.push({ status });
    if (status === "completed") {
        yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $inc: { "driverInfo.0.earnings": ride.fare }
        });
    }
    yield ride.save();
    res.json({ message: 'Ride status updated' });
}));
// ----------4.cancelRide
const cancelRide = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const ride = yield ride_service_1.rideServices.cancelRide(id, req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Rider cencel successfully ✅",
        data: null,
    });
}));
// --------5.  getRideHistory
const getRideHistory = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.RideModel.find({ rider: req.user.userId }); //  rider: req.user!.userId  ekane req.user.userId access korar smy keyal rakte hobe id diye save korcilm naki userId diye sei onujai name dite hobe.
    if (!rides) {
        throw new AppError_1.default(400, "rides history not found");
    }
    const totalRides = yield ride_model_1.RideModel.countDocuments();
    console.log(rides);
    res.status(200).json({
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: " all rides history",
        total: totalRides,
        history: rides,
    });
}));
// ------6. getAllRides
const getAllRides = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allRides = yield ride_model_1.RideModel.find().lean();
    const totalRides = yield ride_model_1.RideModel.countDocuments();
    res.status(200).json({
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: " all rides",
        totalRides,
        allRides,
    });
}));
// ----------
exports.rideControllers = {
    requestRide,
    acceptRide,
    updateRideStatus,
    cancelRide,
    getRideHistory,
    getAllRides
};
