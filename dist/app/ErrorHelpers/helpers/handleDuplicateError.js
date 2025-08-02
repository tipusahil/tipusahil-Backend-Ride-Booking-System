"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    // 1. mongoose 11000 (duplicate key error) -> duplicate data store korte caile mongoose ei error dei.
    const matchedArray = err.message.match(/"([^"]*)"/);
    //   console.log(matchedArray);
    return {
        statusCode: 400,
        message: ` "${matchedArray[1]}" already exist! `,
    };
};
exports.handleDuplicateError = handleDuplicateError;
