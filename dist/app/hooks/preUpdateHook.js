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
exports.preUpdateHook = preUpdateHook;
function preUpdateHook(schema, fieldForSlug, extraTextForSlug) {
    // 🔹 ---------2. Pre Update Hook → যখন updateData update হচ্ছে, তখন slug রি-জেনারেট করা হবে (যদি title পরিবর্তন হয়)--------
    schema.pre("findOneAndUpdate", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            // 🔍 এই হুক তখন চলে যখন `.findOneAndUpdate()` বা `.findByIdAndUpdate()` ব্যবহার করা হয়
            // 🔐 এখানে `this` মানে হলো query object, তাই `.getUpdate()` দিয়ে update values পাওয়া যায়
            const updateData = this.getUpdate();
            if (fieldForSlug && updateData[fieldForSlug]) {
                // 🔡 slug তৈরি করা হচ্ছে updated field থেকে (যেমন title)
                const baseSlug = updateData[fieldForSlug].toLowerCase().split(" ").join("-");
                let slug = extraTextForSlug ? `${baseSlug}-${extraTextForSlug}` : `${baseSlug}`;
                //   const Model = this.constructor; // dynamically get the model from 'this' ,,currentModel dhorte evabe dhorte   hbeconst 
                const Model = this.model;
                let counter = 0;
                while (yield Model.exists({ slug })) {
                    slug = `${baseSlug}-${++counter}`;
                }
                updateData.slug = slug; // ✅ updated slug সেট করে দেওয়া হচ্ছে
                // 🛠️ VERY IMPORTANT:
                // After modifying the update object, we must set it back using `setUpdate`
                this.setUpdate(updateData); // 🔄 updated updateData object টা আবার query তে set করতে হবে
            }
            next(); // পরবর্তী middleware/hook এ যাও
        });
    });
}
