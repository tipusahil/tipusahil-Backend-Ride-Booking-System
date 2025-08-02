"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = void 0;
const env_1 = require("../config/env");
const jwt_1 = require("./jwt");
const createUserTokens = (user) => {
    const jwtPayload1 = {
        userId: user._id, // kuno jaiga theke ei id access korte caile (req.user.userId) ei name use korte hobe,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.tokenGenerator)(jwtPayload1, env_1.envVars.JWT_ACCESS_SECRET_SIGNATURE, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.tokenGenerator)(jwtPayload1, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserTokens = createUserTokens;
