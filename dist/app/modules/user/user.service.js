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
exports.userServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const createUserTokens_1 = require("../../utils/createUserTokens");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const searchAbleFieldsConstant_1 = require("../../utils/searchAbleFieldsConstant");
const setAuthTokensToCookies_1 = require("../../utils/setAuthTokensToCookies");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../ErrorHelpers/AppError/AppError"));
const registerUser = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role, driverInfo } = payload;
    const isUserExist = yield user_model_1.UserModel.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "This User Already Registered!");
    }
    ;
    if (role !== user_interface_1.Role.driver) {
        payload.driverInfo = undefined; // নিশ্চিত করছি non-driver দের জন্য driverInfo save না হয়
    }
    // যদি driver হয় তাহলে driverInfo থাকা লাগবে
    if (role === user_interface_1.Role.driver && !driverInfo) {
        throw new AppError_1.default(400, "please enter your driverInfo data, and then you register as a driver");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    payload.password = hashedPassword;
    const result = yield user_model_1.UserModel.create(payload);
    const tokens = (0, createUserTokens_1.createUserTokens)(result);
    (0, setAuthTokensToCookies_1.setAuthTokensToCookies)(res, tokens);
    return {
        data: result,
        message: `User Register Successfully as a ${role}`,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
});
// ------2. 
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBulder1 = new QueryBuilder_1.QueryBuilder(user_model_1.UserModel.find(), query);
    const data = yield queryBulder1
        .search(searchAbleFieldsConstant_1.searchAbleFieldsConstant)
        .filter()
        .sort()
        .fields()
        .paginate();
    //  .build(); // build() eta call dite hobe, or (.modelQuery) eta dite hobe, nahoi kaj korbena.,eta niser line e call kora hoise,
    const QueryExucute = yield Promise.all([data.build(), queryBulder1.getMeta()]);
    // console.log(QueryExucute);
    const [users, meta] = QueryExucute;
    return {
        data: users,
        meta: meta,
    };
});
exports.userServices = {
    registerUser,
    getAllUsers
};
