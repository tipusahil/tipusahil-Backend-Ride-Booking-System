"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ----envLoader function start here ------
const loadEnvVariables = () => {
    const requiredEnvVariables = ["PORT", "DATABASE_URL", "NODE_ENV", "JWT_ACCESS_SECRET_SIGNATURE", "JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CALLBACK_URL", "FRONTEND_URL", "EXPRESS_SESSION_SECRET"];
    // ----
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing the require Environment variable ${key}`);
        }
    });
    // ----
    return {
        PORT: process.env.PORT,
        //   DATABASE_URL: process.env.DATABASE_URL as string, //otaba niser line ta ,but non-null assertion disable korte hbe,nahoi eslint error dibe.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
        JWT_ACCESS_SECRET_SIGNATURE: process.env.JWT_ACCESS_SECRET_SIGNATURE,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        // SUPER_ADMIN_FIRST_NAME : process.env.SUPER_ADMIN_FIRST_NAME as string,
        // SUPER_ADMIN_LAST_NAME : process.env.SUPER_ADMIN_LAST_NAME as string,
    };
    // --
};
// ----envLoader function end here ------
exports.envVars = loadEnvVariables();
