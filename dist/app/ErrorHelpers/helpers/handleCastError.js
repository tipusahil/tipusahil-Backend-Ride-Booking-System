"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleCastError = (err) => {
    // 2. mongoose CastError -> objectId vul dile ei error dei mongoose theke
    return {
        statusCode: 400,
        message: "Invalid mongoDB objectId, Please provide a valid _id.",
    };
};
exports.handleCastError = handleCastError;
