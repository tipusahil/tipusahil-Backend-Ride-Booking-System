import { Response } from "express";

export interface T_authTokens {
    accessToken ?: string,
    refreshToken ?: string
}

export const  setAuthTokensToCookies = (res:Response, tokensInfo :T_authTokens ) =>{
if(tokensInfo.accessToken){
    res.cookie("accessToken",tokensInfo.accessToken, { httpOnly: true, secure: false });
}

if(tokensInfo.refreshToken){
    res.cookie("refreshToken",tokensInfo.refreshToken,  { httpOnly:true, secure:false });
}
};