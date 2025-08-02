/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorHandlerResponse } from "../../types/customTypes";




export const handleDuplicateError = (err: any) : TGenericErrorHandlerResponse => {
  // 1. mongoose 11000 (duplicate key error) -> duplicate data store korte caile mongoose ei error dei.

  const matchedArray = err.message.match(/"([^"]*)"/);
//   console.log(matchedArray);

  return {
    statusCode: 400,
    message: ` "${matchedArray[1]}" already exist! `,
  };
};
