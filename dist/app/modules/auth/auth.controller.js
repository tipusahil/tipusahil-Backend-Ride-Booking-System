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
exports.authControllers = exports.credentialLogin = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsyncFunc_1 = __importDefault(require("../../utils/catchAsyncFunc"));
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
// -----1.registerUser 
const registerUser = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.userServices.registerUser(res, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: result.message,
        data: {
            accesstoken: result.accessToken,
            refreshtoken: result.refreshToken,
            user: result.data,
        }
    });
}));
// --------2. credentialLogin
exports.credentialLogin = (0, catchAsyncFunc_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield auth_service_1.authServices.credentialLogin(res, payload);
    if (result) {
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User Logged In Successfully✅",
        data: {
            accesstoken: result.accesstoken,
            refreshtoken: result.refreshtoken,
            user: result.user
        }
    });
}));
exports.authControllers = {
    credentialLogin: exports.credentialLogin,
    registerUser
};
