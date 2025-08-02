import { Types } from "mongoose";

interface ILocation {
  lat: number;
  lng: number;
}

export interface IStatusHistory {
  status: string;
  timestamp?: Date;
}


export type Status =  'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';

export interface IRide {
    _id: string,
  rider: Types.ObjectId;
  driver?: string;
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  status: Status ;
  fare: number;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: IStatusHistory[];
}
