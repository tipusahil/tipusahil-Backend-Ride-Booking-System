import jwt,{ JwtPayload, SignOptions } from "jsonwebtoken";

import { envVars } from "../config/env";





export const tokenGenerator = ( payload : JwtPayload, secretSignature:string, expiresIn:string)=>{
    const token = jwt.sign(payload, secretSignature, { expiresIn } as SignOptions);
    return token;
};


export const tokenVerifier = (accessTokenFromHeaders : string, secretSignature : string) : JwtPayload  =>{
try {
    // accessTokenFromHeaders = req.headers.authorization; request er headers theke token ta access korte hobe, 
const verifiedDecodedToken = jwt.verify(accessTokenFromHeaders,secretSignature) as JwtPayload;

return verifiedDecodedToken;
} catch (error) {

  if(envVars.NODE_ENV ==="development"){
   console.error("Token verification failed:", error);
  }
    throw new AppError(401, "Invalid or expired token");
  
}
}