import { Response } from "express";

export interface Tmeta {
  page?: number;
  totalPage?: number;
  limit?: number;
  total?: number;
}

interface TsendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Tmeta;
}
export const sendResponse = <T>(res: Response, data: TsendResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
