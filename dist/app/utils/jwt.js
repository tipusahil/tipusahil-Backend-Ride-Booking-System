"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerifier = exports.tokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../ErrorHelpers/AppError/AppError"));
const tokenGenerator = (payload, secretSignature, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secretSignature, { expiresIn });
    return token;
};
exports.tokenGenerator = tokenGenerator;
const tokenVerifier = (accessTokenFromHeaders, secretSignature) => {
    try {
        // accessTokenFromHeaders = req.headers.authorization; request er headers theke token ta access korte hobe, 
        const verifiedDecodedToken = jsonwebtoken_1.default.verify(accessTokenFromHeaders, secretSignature);
        return verifiedDecodedToken;
    }
    catch (error) {
        if (env_1.envVars.NODE_ENV === "development") {
            console.error("Token verification failed:", error);
        }
        throw new AppError_1.default(401, "Invalid or expired token");
    }
};
exports.tokenVerifier = tokenVerifier;
