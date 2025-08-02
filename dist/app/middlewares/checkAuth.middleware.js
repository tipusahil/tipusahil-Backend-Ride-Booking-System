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
exports.checkAuthMidddleware = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../utils/jwt");
const AppError_1 = __importDefault(require("../ErrorHelpers/AppError/AppError"));
const checkAuthMidddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessTokenFromHeaders = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || req.cookies.token;
    if (!accessTokenFromHeaders) {
        throw new AppError_1.default(401, "No Token Provided to Headers.");
    }
    try {
        const VerifiedToken = (0, jwt_1.tokenVerifier)(accessTokenFromHeaders, env_1.envVars.JWT_ACCESS_SECRET_SIGNATURE);
        req.user = VerifiedToken;
        if (env_1.envVars.NODE_ENV === "development") {
            console.log("verified token: ", VerifiedToken); // varified token er payload dekabe, jegulo diye jwtPayload dewa hoisilo
        }
        // const isUserExist = await UserModel.findById(req.user.id)
        const isUserExist = yield user_model_1.UserModel.findOne({ email: VerifiedToken.email });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Does Not Exist!");
        }
        if (isUserExist.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is Blocked!");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuthMidddleware = checkAuthMidddleware;
