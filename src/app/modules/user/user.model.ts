import { model, Schema } from "mongoose";
import { IUser, Role, TDriverInfo, vehicleInfo,  } from "./user.interface";

const  vehicleInfo = new Schema<vehicleInfo>({
vehicleType : {type : String, required : true , trim:true },
licensePlate : {type : String, required : true, trim:true },
},
{
    // versionKey: false,
    timestamps: true
});


const  TDriverInfoSchema = new Schema<TDriverInfo>({
    vehicleInfo : {type : vehicleInfo   } ,
    isApproved : {type : Boolean, default : false },
    isOnline : {type : Boolean, default : false },
    earnings : {type : Number,default : 0 }
},
{
    // versionKey: false,
    timestamps: true
});



const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim:true },
  email: { type: String, required: true ,unique: true, trim:true  },
  password: { type: String, required: true, trim:true},
  role: { type: String, enum: Object.values(Role), required: true ,lowercase: true,trim:true },//interface.ts file e Role ta enum type hote hbe.nahoi ekane import korar saggestion dibena.
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date , default : Date.now},
  driverInfo: {type:[TDriverInfoSchema], default: []},
},
{
    // versionKey: false,
    timestamps: true
}
);


export const UserModel = model("UserModel", userSchema, "user_collection");
