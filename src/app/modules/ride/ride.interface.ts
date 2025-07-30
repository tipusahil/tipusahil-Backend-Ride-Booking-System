import { Types } from "mongoose";

interface ILocation {
  lat: number;
  lng: number;
}

export interface IStatusHistory {
  status: string;
  timestamp: Date;
}


export type status =  'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';

export interface IRide {
    _id: string,
  rider: Types.ObjectId;
  driver?: string;
  pickupLocation: Location;
  destinationLocation: Location;
  status: status ;
  fare: number;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: IStatusHistory[];
}
