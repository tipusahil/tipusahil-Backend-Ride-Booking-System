
export interface TErrorSourcesArray {
  path: string;
  message: string;
}

export interface TGenericErrorHandlerResponse {
    statusCode :  number,
    message : string,
    errorSourcesArray ?: TErrorSourcesArray[],
    issues ?: any[]
}
