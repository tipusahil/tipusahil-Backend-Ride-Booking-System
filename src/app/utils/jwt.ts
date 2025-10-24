import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { envVars } from "../config/env";
import AppError from "../ErrorHelpers/AppError/AppError";





export const tokenGenerator = ( payload : JwtPayload, secretSignature:string, expiresIn:string)=>{
    const token = jwt.sign(payload, secretSignature, { expiresIn } as SignOptions);
    return token;
};


export const tokenVerifier = (accessTokenFromHeadersOrCookies : string, secretSignature : string) : JwtPayload  =>{
try {
    // accessTokenFromHeadersOrCookies = req.headers.authorization; request er headers theke token ta access korte hobe, 
    console.log("jwt.ts file theke----:1:",accessTokenFromHeadersOrCookies)
const verifiedDecodedToken = jwt.verify(accessTokenFromHeadersOrCookies,secretSignature) as JwtPayload;
    console.log("jwt.ts file theke----:2:",accessTokenFromHeadersOrCookies)
return verifiedDecodedToken;
} catch (error) {

  if(envVars.NODE_ENV ==="development"){
   console.error("Token verification failed:", error);
  }
    throw new AppError(401, "Invalid or expired token");
  
}
}