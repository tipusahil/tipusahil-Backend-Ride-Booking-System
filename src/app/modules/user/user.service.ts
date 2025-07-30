import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../ErrorHelpers/AppError/AppError";
import { IUser } from "./user.interface"
import { UserModel } from "./user.model"
import bcryptjs from "bcryptjs"
import { envVars } from '../../config/env';

const createUser =async (payload : Partial<IUser>) =>{

const {email, password, ...rest } = payload;

    const isUserExist = await UserModel.findOne({ email });
if(isUserExist){
    throw new AppError(httpStatusCodes.CONFLICT,"This User Already Exist!");
}; 

const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
payload.password = hashedPassword;
const result = await UserModel.create(payload);

return {
    data : result
}
}





export const userServices = {
    createUser,
}