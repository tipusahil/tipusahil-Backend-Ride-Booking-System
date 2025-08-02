"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthTokensToCookies = void 0;
const setAuthTokensToCookies = (res, tokensInfo) => {
    if (tokensInfo.accessToken) {
        res.cookie("accessToken", tokensInfo.accessToken, { httpOnly: true, secure: false });
    }
    if (tokensInfo.refreshToken) {
        res.cookie("refreshToken", tokensInfo.refreshToken, { httpOnly: true, secure: false });
    }
};
exports.setAuthTokensToCookies = setAuthTokensToCookies;
