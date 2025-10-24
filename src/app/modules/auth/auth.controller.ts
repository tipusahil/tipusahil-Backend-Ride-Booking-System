import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "../user/user.service";
import { authServices } from "./auth.service";

// -----1.registerUser
const registerUser = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await userServices.registerUser(res, payload); // ✅ payload পাঠাও

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: result.message,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.data,
      },
    });
  }
);

// --------2. credentialLogin
export const credentialLogin = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authServices.credentialLogin(
      res,
      payload as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Logged In Successfully✅",
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      },
    });
  }
);

// --------3. logout
// --------3. logout
const logout = catchAsyncFunc(
  async (req: Request, res: Response, next: NextFunction) => {
    // কুকি ক্লিয়ার করার জন্য অপশনগুলো একই লজিকে সংজ্ঞায়িত করা হলো
    // এই অপশনগুলি setAuthTokensToCookies-এর সাথে হুবহু মিলতে হবে।
    const cookieClearOptions = {
      httpOnly: true, // যেহেতু আপনি শুধুমাত্র টোকেন-ভিত্তিক প্রমাণীকরণ ব্যবহার করছেন, সেশন সম্পর্কিত কোড মুছে ফেলা হয়েছে।
      secure: envVars.NODE_ENV === "production",
      sameSite:
        envVars.NODE_ENV === "production" ? "none" : ("lax" as "lax" | "none"),
      path: "/",
    }; // সেশন বা Passport.js ফাংশন ছাড়াই শুধুমাত্র টোকেন কুকিগুলি ক্লিয়ার করা হচ্ছে

    res.clearCookie("accessToken", cookieClearOptions);
    res.clearCookie("refreshToken", cookieClearOptions);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User Logged Out Successfully✅ (Token Cleared)",
      data: null,
    });
  }
);

export const authControllers = {
  credentialLogin,
  registerUser,
  logout,
};
