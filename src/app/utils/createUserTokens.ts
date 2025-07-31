import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { tokenGenerator } from "./jwt";

export const createUserTokens = (user : Partial<IUser>) =>{
const jwtPayload1 = {
    userId: user._id,// kuno jaiga theke ei id access korte caile (req.user.userId) ei name use korte hobe,
    email : user.email,
    role : user.role
}

const accessToken = tokenGenerator(jwtPayload1,  envVars.JWT_ACCESS_SECRET_SIGNATURE!, envVars.JWT_ACCESS_EXPIRES);
const refreshToken = tokenGenerator(jwtPayload1,  envVars.JWT_REFRESH_SECRET!,  envVars.JWT_REFRESH_EXPIRES);

return {
    accessToken,
    refreshToken
}
}