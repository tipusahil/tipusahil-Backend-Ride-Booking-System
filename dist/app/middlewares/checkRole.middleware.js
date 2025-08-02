"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole_middleware = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../ErrorHelpers/AppError/AppError"));
const checkRole_middleware = (...roles) => {
    return (req, res, next) => {
        // ✅ Step 1: Check if user exists (i.e., authenticated)
        if (!req.user) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Access denied, please login first');
        }
        // ✅ Step 2: Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'You are not permitted to access this route');
        }
        // ✅ Step 3: Access granted
        next();
    };
};
exports.checkRole_middleware = checkRole_middleware;
