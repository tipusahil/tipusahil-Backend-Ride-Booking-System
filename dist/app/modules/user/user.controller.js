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
exports.userControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsyncFunc_1 = __importDefault(require("../../utils/catchAsyncFunc"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
// ------1. getAllUsers
const getAllUsers = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    // const users = await userServices.getAllUsers( query : Record<string, string>);// ❌
    const users = yield user_service_1.userServices.getAllUsers(query); //✅ (as) use hobe (:) clone na
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "all users Retrieved successfully",
        data: users.data,
        meta: users.meta
    });
}));
// -------2. blockUser
const blockUser = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdOrAdminId = req.params.id;
    yield user_model_1.UserModel.findByIdAndUpdate(userIdOrAdminId, { isBlocked: true });
    res.json({ message: 'User blocked' });
}));
// --------
exports.userControllers = {
    getAllUsers,
    blockUser
};
