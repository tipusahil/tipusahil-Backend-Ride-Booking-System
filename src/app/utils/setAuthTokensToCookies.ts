import { Response } from "express";
import { envVars } from "../config/env";

export interface T_authTokens {
  accessToken?: string;
  refreshToken?: string;
}

// এই ভেরিয়েবলটি ডেভেলপমেন্টে কুকি সেটের জন্য 'Secure: false' সেট করতে সাহায্য করবে
const isProduction = envVars.NODE_ENV === "production";

export const setAuthTokensToCookies = (
  res: Response,
  tokensInfo: T_authTokens
) => {
  // SameSite এবং Secure এর জন্য কাস্টম কনফিগারেশন
  const cookieOptions = {
    httpOnly: true, // প্রোডাকশনে অবশ্যই Secure: true হবে। কিন্তু ডেভেলপমেন্টে (http://) // কাজ করার জন্য Secure: false করতে হবে।
    secure: isProduction, // ক্রস-অরিজিন কুকি সেটের জন্য SameSite: None হতে হবে। // কিন্তু SameSite=None তখনই কাজ করবে যখন Secure=true হবে। // যেহেতু ডেভেলপমেন্টে Secure: false থাকছে, তাই SameSite: Lax/Strict ব্যবহার করতে হবে। // তবে যেহেতু আপনার রিকোয়েস্টটি ক্রস-অরিজিন, আমরা SameSite: None সেট করব এবং // ডেভেলপমেন্টে একটি বিশেষ পরিস্থিতিতে ব্রাউজারটিকে বাইপাস করার আশা করব।
    sameSite: isProduction ? "none" : ("lax" as "lax" | "none"), // এনভাইরনমেন্ট অনুযায়ী None বা Lax
    path: "/",
  }; // 💡 মূল সমস্যাটি হচ্ছে, dev-এ (http) SameSite=None কাজ করে না। // হার্ডকোডেড ডেভেলপমেন্ট ফিক্স (যদি উপরের কোড কাজ না করে):

  // এই সমস্যার সবচেয়ে নির্ভরযোগ্য সমাধান হলো Dev-এ backend-কে একই পোর্ট (e.g. proxy) থেকে সার্ভ করা অথবা
  // শুধুমাত্র Dev-এর জন্য নিচের line-দুটিকে (SameSite/Secure) হার্ডকোড করে দেওয়া।

  const devFixOptions = {
    httpOnly: true,
    secure: false, // Dev (HTTP) এ Secure: false
    sameSite: "lax" as "lax" | "none", // Dev (HTTP) এ Lax ব্যবহার করাই নিরাপদ যদি একই ডোমেইন হয়
    path: "/",
  };

  // যেহেতু আপনার সমস্যাটি ক্রস-অরিজিনে কুকি সেট না হওয়া নিয়ে,
  // তাই আমি আপনার original লজিকটিই রাখলাম কিন্তু 'none' কে ফোর্স করতে চাইলে নিচের কোড ব্যবহার করুন:
  const runtimeOptions = isProduction ? cookieOptions : devFixOptions;

  if (tokensInfo.accessToken) {
    try {
      res.cookie("accessToken", tokensInfo.accessToken, {
        ...runtimeOptions,
        maxAge: 5 * 24 * 60 * 60 * 1000, // 15 মিনিট
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (tokensInfo.refreshToken) {
    res.cookie("refreshToken", tokensInfo.refreshToken, {
      ...runtimeOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 দিন
    });
  }
};
