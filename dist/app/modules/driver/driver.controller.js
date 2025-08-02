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
exports.driverControllers = void 0;
const catchAsyncFunc_1 = __importDefault(require("../../utils/catchAsyncFunc"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../ErrorHelpers/AppError/AppError"));
// -----------1. setAvailability
const setAvailability = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { isOnline } = req.body;
    const userId = req.user.userId;
    const user = yield user_model_1.UserModel.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (!((_a = user.driverInfo) === null || _a === void 0 ? void 0 : _a.length)) {
        // 🟡 (!user.driverInfo?.length) = "user-এর কোনো driverInfo এখনো নেই বা সেটি ফাঁকা, তাহলে..."
        // “যদি user.driverInfo না থাকে বা থাকে কিন্তু empty হয়, তাহলে এই block এ ঢুকো।”
        throw new AppError_1.default(400, "Driver info not found. Please register vehicle information first.");
    }
    // update only isOnline field in the first driverInfo object
    user.driverInfo[0].isOnline = isOnline;
    console.log(user.driverInfo[0].isOnline);
    console.log(isOnline);
    yield user.save();
    res.json({ message: `Availability updated` });
}));
// ----------2. getEarnings
const getEarnings = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const myId = req.user.userId;
    const driver = yield user_model_1.UserModel.findById(myId);
    res.json({ earnings: (_b = (_a = driver === null || driver === void 0 ? void 0 : driver.driverInfo) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.earnings });
}));
// -------------3. approveDriver
const approveDriver = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userOrDriverId = req.params.id;
    const approveDriver = yield user_model_1.UserModel.findByIdAndUpdate(userOrDriverId, { "driverInfo.[0].isApproved": true });
    res.status(200).json({ message: ' Driver approved✅ ' });
}));
// -----------
exports.driverControllers = {
    setAvailability,
    getEarnings,
    approveDriver
};
