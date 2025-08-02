/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from "mongoose";

export function preUpdateHook(schema: Schema, fieldForSlug?: string , extraTextForSlug?: string) {
  // 🔹 ---------2. Pre Update Hook → যখন updateData update হচ্ছে, তখন slug রি-জেনারেট করা হবে (যদি title পরিবর্তন হয়)--------
  schema.pre("findOneAndUpdate", async function (next) {

    // 🔍 এই হুক তখন চলে যখন `.findOneAndUpdate()` বা `.findByIdAndUpdate()` ব্যবহার করা হয়

    // 🔐 এখানে `this` মানে হলো query object, তাই `.getUpdate()` দিয়ে update values পাওয়া যায়
    const updateData = this.getUpdate() as Record<string, any>;

    if (fieldForSlug && updateData[fieldForSlug]) {
      // 🔡 slug তৈরি করা হচ্ছে updated field থেকে (যেমন title)

      const baseSlug = updateData[fieldForSlug].toLowerCase().split(" ").join("-");
      let slug = extraTextForSlug? `${baseSlug}-${extraTextForSlug}` : `${baseSlug}`;

    //   const Model = this.constructor; // dynamically get the model from 'this' ,,currentModel dhorte evabe dhorte   hbeconst 
   const  Model = this.model; 

      let counter = 0;
      while (await Model.exists({ slug })) {
        slug = `${baseSlug}-${++counter}`;
      }

      updateData.slug = slug; // ✅ updated slug সেট করে দেওয়া হচ্ছে

      // 🛠️ VERY IMPORTANT:
      // After modifying the update object, we must set it back using `setUpdate`
      this.setUpdate(updateData); // 🔄 updated updateData object টা আবার query তে set করতে হবে
    }

    next(); // পরবর্তী middleware/hook এ যাও
  });
}
