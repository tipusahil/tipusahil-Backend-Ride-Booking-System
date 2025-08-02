import mongoose from "mongoose";
import { TGenericErrorHandlerResponse } from "../interfaces/error.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleCastError = ( err: mongoose.Error.CastError)  : TGenericErrorHandlerResponse => {
  // 2. mongoose CastError -> objectId vul dile ei error dei mongoose theke
  return {
    statusCode: 400,
    message: "Invalid mongoDB objectId, Please provide a valid _id.",
  };
};
