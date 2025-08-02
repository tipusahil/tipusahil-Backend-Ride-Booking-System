"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../config/env");
const catchAsyncFunc = (childFunc) => (req, res, next) => {
    Promise.resolve(childFunc(req, res, next)).catch((err) => {
        if (env_1.envVars.NODE_ENV === 'development') {
            console.log(err);
        }
        next(err);
    });
};
exports.default = catchAsyncFunc;
