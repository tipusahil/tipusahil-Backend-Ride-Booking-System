/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorSourcesArray, TGenericErrorHandlerResponse } from "../../types/customTypes";




export const handleValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorHandlerResponse => {

  // 3. mongoose validation error
  const errorSourcesArray: TErrorSourcesArray[] = [];


  const errors = Object.values(err.errors);
  errors.forEach((errorObject: any) =>
    errorSourcesArray.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );
//   console.log("-----------", errorSourcesArray, "-----------------");

  return {
    statusCode: 400,
    message: "Validation Error Occured!",
    errorSourcesArray,
  };
};