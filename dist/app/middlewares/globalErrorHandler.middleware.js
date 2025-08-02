"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleZodError_1 = require("../ErrorHelpers/helpers/handleZodError");
const handleDuplicateError_1 = require("../ErrorHelpers/helpers/handleDuplicateError");
const handleCastError_1 = require("../ErrorHelpers/helpers/handleCastError");
const handleValidationError_1 = require("../ErrorHelpers/helpers/handleValidationError");
const AppError_1 = __importDefault(require("../ErrorHelpers/AppError/AppError"));
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------
    if (env_1.envVars.NODE_ENV === "development") {
        console.log(err);
    }
    // mongoose  data k validation and senityzation kore, and mongoose database er sate communicate korei ja validation korar kore..-> mongoose e ja ja error dite pare :
    /*
  1. duplicate error
  2. Cast Error
  3. validator error (validator)
  */
    //  zod  o data k validation kore, and eta Application er moddo thekei check kore ortat validation kore. ->
    // ------------------------
    let errorSourcesArray = [
    // {
    //     path:"isDeleted",
    //     message : "cast failed"
    // }
    ];
    let statusCode = 500;
    let message = `something went wrong!!`;
    let issues = null;
    //   --------------------------------validation checkers conditions --------------
    if (err.name === "ZodError") {
        // 1. zod error--
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        errorSourcesArray = simplifiedError.errorSourcesArray;
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        issues = simplifiedError.issues;
    }
    else if (err.code === 11000) {
        // 1. mongoose 11000 (duplicate key error) -> duplicate data store korte caile mongoose ei error dei.
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "CastError") {
        // 2. mongoose CastError -> objectId vul dile ei error dei mongoose theke
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ValidationError") {
        // 3. mongoose validation error
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        errorSourcesArray = simplifiedError.errorSourcesArray;
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } // ------------------------------------------------------------
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode1;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSourcesArray,
        err: env_1.envVars.NODE_ENV === "development" ? { name: err.name, issues } : null, // development stage e taklei error dekabe, kutai ki error hocce seta, but jokon production ba binno stage  jabe tokon err, dekabena, security perpas e eta emn kora hocce.
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null,
        // err.stack = kon file er koto number line theke error ta dicce seta err.stack e take/dekai.
        //  stack er logic ta holo, jokon development stage e ei project ta takbe tik tokoni err.stack ta dekabe, ar jodi development stage e na theke jodi production kinba onno kuno stage e take, tokon koto number file theke error dicce seta dekabena.
        // stage hocce (envVars.NODE_ENV) ei variable e jeta take otai dhorbe.ei varibel e jodi tahke production tokonei err.stack ta dekabena.
    });
});
exports.globalErrorHandler = globalErrorHandler;
