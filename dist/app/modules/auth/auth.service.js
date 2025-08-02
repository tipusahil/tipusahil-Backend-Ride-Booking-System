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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zodSchemaValidation_1 = require("../../utils/zodSchemaValidation");
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = require("http-status-codes");
const createUserTokens_1 = require("../../utils/createUserTokens");
const setAuthTokensToCookies_1 = require("../../utils/setAuthTokensToCookies");
const AppError_1 = __importDefault(require("../../ErrorHelpers/AppError/AppError"));
const credentialLogin = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = zodSchemaValidation_1.loginSchema.parse(payload);
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User Does not Register!, please register first");
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(401, "Incorrect password!");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(403, "Account is Blocked!");
    }
    const { password: pass } = payload, rest = __rest(payload, ["password"]);
    //   const tokens = createUserTokens(user) as JwtPayload;
    const tokens = (0, createUserTokens_1.createUserTokens)(user);
    (0, setAuthTokensToCookies_1.setAuthTokensToCookies)(res, tokens);
    return {
        accesstoken: tokens.accessToken,
        refreshtoken: tokens.refreshToken,
        user: rest
    };
});
exports.authServices = {
    credentialLogin
};
