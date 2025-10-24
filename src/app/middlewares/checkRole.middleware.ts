import httpStatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import AppError from '../ErrorHelpers/AppError/AppError';



export const checkRole_middleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
 // Step 1: Check if user exists
    if (!req.user) {
      throw new AppError(httpStatusCodes.UNAUTHORIZED, 'Access denied, please login first');
    }

    // Step 2: Check if role exists and is allowed
    if (!req.user.role || !roles.includes(req.user.role)) {
      throw new AppError(httpStatusCodes.FORBIDDEN, 'You are not permitted to access this route');
    }


    // ✅ Step 3: Access granted
    next();
  };
};
