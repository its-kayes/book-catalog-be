import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { AuthService } from "./auth.service";
import { throwResponse } from "../../shared/throwResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { JWT_ACCESS_TOKEN_EXPIRES_IN } from "../../config/siteEnv";

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

const signin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  if(!req.body.email || !req.body.password) {
    next(new AppError("Missing require Value", httpStatus.BAD_REQUEST));
  }
  const result = await AuthService.verifyUser(req.body);
  if(!result) {
    next(new AppError("Error to Sign in", httpStatus.INTERNAL_SERVER_ERROR))
  }

  const payload = {
    _id: result._id,
    username: result.username,
  };

  const options = {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as string
  };


  const accessToken = await jwtHelpers.createToken(payload, options);

  const data = {
    accessToken,
    user: {
      _id: result._id,
      username: result.username,
    }
  }
  return throwResponse(res, data, httpStatus.OK, "Signin", true);
})

export const AuthController = {
  signup,
  signin
};
