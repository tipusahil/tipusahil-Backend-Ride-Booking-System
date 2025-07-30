

export enum Role { // eta enum type hobe, kuno (interface/type ) hobena
  super_admin = "super_admin",
  admin = "admin",
  rider = "rider",
  driver = "driver",
}

export interface vehicleInfo {
vehicleType : string,
licensePlate : string,
}

export interface TDriverInfo  {
    vehicleInfo : vehicleInfo ,
    isApproved : boolean,
    isOnline : boolean,
    earnings : number
}

export interface IUser {
    _id ?: string,
    name : string ,
    email : string,
    password : string,
    role : Role,
    isBlocked : boolean,
    createdAt : Date,
    driverInfo ?: TDriverInfo

}