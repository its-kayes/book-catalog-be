import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_SECRET } from '../config/siteEnv';
import AppError from '../errors/AppError';

export type IIsAuthorized = {
  _id: ObjectId;
  username: string;
};

export const isVerified =
  // (...permissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ================ Authentication ==================
      const token = req.headers.authorization?.split(' ')[1] as string | null;
      if (!token) {
        throw new AppError('No Authorization Token', httpStatus.NOT_FOUND);
      }
      const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (!decoded) {
        throw new AppError('Unauthorized User', httpStatus.UNAUTHORIZED);
      }

      // ================ Authorization ==================

      // Check if user has permission to access this route
      // if (permissions.length > 0 && !permissions.includes(decoded.role)) {
      //   throw new AppError(
      //     'You do not have permission to perform this action',
      //     httpStatus.FORBIDDEN
      //   );
      // }

      req.body.isAuthorized = decoded as IIsAuthorized;
      next();
    } catch (error) {
      return next(error);
    }
  };
