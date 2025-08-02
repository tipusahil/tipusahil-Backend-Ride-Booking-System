"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    // 3. mongoose validation error
    const errorSourcesArray = [];
    const errors = Object.values(err.errors);
    errors.forEach((errorObject) => errorSourcesArray.push({
        path: errorObject.path,
        message: errorObject.message,
    }));
    //   console.log("-----------", errorSourcesArray, "-----------------");
    return {
        statusCode: 400,
        message: "Validation Error Occured!",
        errorSourcesArray,
    };
};
exports.handleValidationError = handleValidationError;
