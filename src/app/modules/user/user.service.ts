import httpStatusCodes from 'http-status-codes';

import bcryptjs from "bcryptjs";
import { Request, Response } from 'express';
import { envVars } from '../../config/env';
import { createUserTokens } from '../../utils/createUserTokens';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { searchAbleFieldsConstant } from '../../utils/searchAbleFieldsConstant';
import { setAuthTokensToCookies } from '../../utils/setAuthTokensToCookies';
import { IUser, Role } from "./user.interface";
import { UserModel } from "./user.model";
import AppError from '../../ErrorHelpers/AppError/AppError';








const registerUser =async (res:Response, payload : IUser) =>{
console.log({payload})
const {email, password,role, driverInfo  } = payload;
console.log({driverInfo})

    const isUserExist = await UserModel.findOne({ email });

if(isUserExist){
    throw new AppError(httpStatusCodes.CONFLICT,"This User Already Registered!");
}; 

 if (role !== Role.driver) {
    payload.driverInfo = undefined; // নিশ্চিত করছি non-driver দের জন্য driverInfo save না হয়
  }


  // যদি driver হয় তাহলে driverInfo থাকা লাগবে
if (role === Role.driver && (!driverInfo || driverInfo.length === 0)) {
  throw new AppError(400, "please enter your driverInfo data, and then you register as a driver");
}

const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
payload.password = hashedPassword;

const result = await UserModel.create(payload);

const tokens = createUserTokens(result);
setAuthTokensToCookies(res,tokens);


return {
    data : result,
    message :`User Register Successfully as a ${role}`,
    accessToken : tokens.accessToken,
    refreshToken : tokens.refreshToken,
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

// -----3. updateUser 
const updateUser =async ( req: Request) =>{
  const payload = req.body as Partial<IUser>;

    const isUserExist = await UserModel.findOne({ email:payload.email });

if(payload?.role ==="admin" && (req.user?.role !=="admin" || isUserExist?.role !=="admin") ){
    throw new AppError(httpStatusCodes.FORBIDDEN,"you are not permitted to be a admin,only admin or super admin can change the admin role");
}; 

const hashedPassword = await bcryptjs.hash(payload?.password as string, Number(envVars.BCRYPT_SALT_ROUND));
payload.password = hashedPassword;

const result = await UserModel.findByIdAndUpdate({id:req.user?.id, data:payload, password: hashedPassword});
return result;
}





// ----------
export const userServices = {
    registerUser,
    getAllUsers,
    updateUser
}