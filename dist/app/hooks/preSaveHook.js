"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreSaveHook_withAttachSlug = PreSaveHook_withAttachSlug;
function PreSaveHook_withAttachSlug(schema, fieldForSlug, extraTextForSlug) {
    schema.pre("save", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = this;
            if (doc.isModified(fieldForSlug)) { // 🔐 `this` মানে হলো নতুন tour ডকুমেন্ট, যেটা ডেটাবেজে save হতে যাচ্ছে
                // 👉 শুধু তখনই slug তৈরি করা হবে যদি fieldForSlug / (name/ttile) ফিল্ড পরিবর্তিত হয়
                const baseSlug = doc[fieldForSlug].toLowerCase().split(" ").join("-"); // eg: "Sajek Tour" → "sajek-tour"
                let slug = extraTextForSlug ? `${baseSlug}-${extraTextForSlug}` : baseSlug; // শুধু title থেকে বানানো slug,jodi extra kisu add korar moto take tahole add hobe, nahoi baseSlug hisebe jeta create hbe setai takbe,
                let counter = 0;
                const Model = doc.constructor; // dynamically get the model from 'this'
                while (yield Model.exists({ slug })) {
                    // 🔁 যদি একই slug আগেই থেকে থাকে, তাহলে ইউনিক করার জন্য counter যুক্ত করা হবে
                    slug = `${baseSlug}-${++counter}`;
                }
                doc.slug = slug; // ✅ ইউনিক slug সেট করে দেওয়া হলো (doc/this) er modde, mane jeta create hoye save hote jacce setar modde 
            }
            next(); // পরবর্তী middleware/hook এ যাও
        });
    });
}
// ---------------------
// -------
// ✅ Mongoose Schema Hooks: এটা এমন এক ফিচার যা দিয়ে document database এ save বা update হবার আগেই (pre) বা পরে (post) স্বয়ংক্রিয়ভাবে কোনো কাজ করিয়ে নেয়া যায়।
// 🔰 GENERAL RULES (সাধারণ নিয়ম):
// 1️⃣ `pre("save")` => এটা শুধু `.save()` বা `.create()` এর সময় কাজ করে।
//     কিন্তু `.findOneAndUpdate()` এর মত method এ এটা কাজ করে না।
// 2️⃣ `pre("findOneAndUpdate")` => এটা `.findByIdAndUpdate()` অথবা `.findOneAndUpdate()` এর আগেই চলে।
//     কারণ `.findByIdAndUpdate()` মূলত ভিতরে গিয়ে `findOneAndUpdate()`-ই ব্যবহার করে।
// 3️⃣ এখানে `this` keyword ঠিকভাবে কাজ করুক তার জন্য **regular function** ব্যবহার করতে হবে, arrow function দিলে কাজ করবে না।
// 4️⃣ প্রত্যেকটা hook এর শেষে `next()` কল করতেই হবে, নাহলে middleware আটকে থাকবে এবং পরবর্তী কাজ হবে না।
// 5️⃣ যদি async কাজ করো (যেমন database check), তাহলে `try-catch` দিয়ে error handle করো, নয়তো unhandled rejection হতে পারে।
// 6️⃣ যদি `slug` field টা schema-তে required হয়, তাহলে অবশ্যই slug create বা update এর আগেই সেট করে দিতে হবে।
// -------
// ✅ Hook ব্যবহার করার মূল নিয়ম:
// 1️⃣ শুধু `.create()` এবং `.save()` এর জন্য `pre("save")` হুক ব্যবহার করতে হয়।
// 2️⃣ `.findByIdAndUpdate()` বা `.findOneAndUpdate()` এর জন্য `pre("findOneAndUpdate")` হুক ব্যবহার করতে হয়।
//    কারণ `findByIdAndUpdate()` এর ভিতরেও `findOneAndUpdate` চলে।
// 3️⃣ কোন hook-এ arrow function ❌ ব্যবহার করা যাবে না,
//    কারণ arrow function-এ `this` কাজ করে না। Regular function ব্যবহার করতে হবে।
