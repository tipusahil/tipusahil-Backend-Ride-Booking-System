import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../ErrorHelpers/AppError/AppError";
import { IUser } from "./user.interface"
import { UserModel } from "./user.model"
import bcryptjs from "bcryptjs"
import { envVars } from '../../config/env';

const registerUser =async (payload : Partial<IUser>) =>{

const {email, password } = payload;

    const isUserExist = await UserModel.findOne({ email });
if(isUserExist){
    throw new AppError(httpStatusCodes.CONFLICT,"This User Already Registered!");
}; 

const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
payload.password = hashedPassword;
const result = await UserModel.create(payload);

return {
    data : result
}
}





export const userServices = {
    registerUser,
}