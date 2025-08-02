import  httpStatusCodes  from 'http-status-codes';
import AppError from "../../ErrorHelpers/AppError/AppError";
import { IUser, Role } from "./user.interface"
import { UserModel } from "./user.model"
import bcryptjs from "bcryptjs"
import { envVars } from '../../config/env';
import { createUserTokens } from '../../utils/createUserTokens';
import { setAuthTokensToCookies } from '../../utils/setAuthTokensToCookies';
import { NextFunction, Response } from 'express';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { searchAbleFieldsConstant } from '../../utils/searchAbleFieldsConstant';


const registerUser =async (res:Response, payload : IUser) =>{

const {email, password,role, driverInfo  } = payload;

    const isUserExist = await UserModel.findOne({ email });

if(isUserExist){
    throw new AppError(httpStatusCodes.CONFLICT,"This User Already Registered!");
}; 

 if (role !== Role.driver) {
    payload.driverInfo = undefined; // নিশ্চিত করছি non-driver দের জন্য driverInfo save না হয়
  }


  // যদি driver হয় তাহলে driverInfo থাকা লাগবে
if(role ===  Role.driver && !driverInfo){
    throw new AppError(400,"please enter your driverInfo data, and then you register as a driver");
}


const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
payload.password = hashedPassword;

const result = await UserModel.create(payload);

const tokens = createUserTokens(result);
setAuthTokensToCookies(res,tokens);

return {
    data : result,
    message :`User Register Successfully as a ${role}`
}
}

// ------2. 
const getAllUsers =async ( query : Record<string, string>) => { 

const queryBulder1 = new  QueryBuilder(UserModel.find(), query);

const data = await queryBulder1
.search(searchAbleFieldsConstant)
.filter()
.sort()
.fields()
.paginate()
  //  .build(); // build() eta call dite hobe, or (.modelQuery) eta dite hobe, nahoi kaj korbena.,eta niser line e call kora hoise,

const QueryExucute = await Promise.all([  data.build(),  queryBulder1.getMeta()  ]);
   // console.log(QueryExucute);

   const [ users, meta ] = QueryExucute;
 return {
    data: users,
    meta: meta,
  };
};


export const userServices = {
    registerUser,
    getAllUsers
}