import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { AuthService } from "./auth.service";
import { throwResponse } from "../../shared/throwResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
      next(new AppError("Missing require Value", httpStatus.BAD_REQUEST));
    }

    const result = await AuthService.saveUser(req.body);
    if(!result) {
        next(new AppError("Error to Sign up", httpStatus.INTERNAL_SERVER_ERROR))
    }

    return throwResponse(res, result, httpStatus.OK, "Signup", true);
  }
);

export const AuthController = {
  signup,
};
