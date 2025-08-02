/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TErrorSourcesArray } from "../types/interfaces/error.types";
import { handleZodError } from "../ErrorHelpers/helpers/handleZodError";
import { handleDuplicateError } from "../ErrorHelpers/helpers/handleDuplicateError";
import { handleCastError } from "../ErrorHelpers/helpers/handleCastError";
import { handleValidationError } from "../ErrorHelpers/helpers/handleValidationError";
import AppError from "../ErrorHelpers/AppError/AppError";




export const globalErrorHandler = async ( err: any, req: Request, res: Response, next: NextFunction ) => {
  // ------------------------
if(envVars.NODE_ENV === "development") {
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

  let errorSourcesArray: TErrorSourcesArray[] = [
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
    const simplifiedError = handleZodError(err);
    errorSourcesArray = simplifiedError.errorSourcesArray as TErrorSourcesArray[] ;
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    issues = simplifiedError.issues
  } 
  else if (err.code === 11000) {
    // 1. mongoose 11000 (duplicate key error) -> duplicate data store korte caile mongoose ei error dei.
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } 
  else if (err.name === "CastError") {
    // 2. mongoose CastError -> objectId vul dile ei error dei mongoose theke
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
   else if (err.name === "ValidationError") {
    // 3. mongoose validation error
    const simplifiedError = handleValidationError(err);

    errorSourcesArray = simplifiedError.errorSourcesArray as TErrorSourcesArray[] ;
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } // ------------------------------------------------------------
  else if (err instanceof AppError) {
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
    err : envVars.NODE_ENV === "development" ? { name : err.name, issues} : null,// development stage e taklei error dekabe, kutai ki error hocce seta, but jokon production ba binno stage  jabe tokon err, dekabena, security perpas e eta emn kora hocce.
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
    // err.stack = kon file er koto number line theke error ta dicce seta err.stack e take/dekai.
    //  stack er logic ta holo, jokon development stage e ei project ta takbe tik tokoni err.stack ta dekabe, ar jodi development stage e na theke jodi production kinba onno kuno stage e take, tokon koto number file theke error dicce seta dekabena.
    // stage hocce (envVars.NODE_ENV) ei variable e jeta take otai dhorbe.ei varibel e jodi tahke production tokonei err.stack ta dekabena.
  });
};
