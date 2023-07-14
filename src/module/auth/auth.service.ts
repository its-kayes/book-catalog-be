import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { hashPassword } from "../../helpers/hashPassword";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";
import { comparePassword } from "../../helpers/comparePassword";

const saveUser = async (data: IAuth) => {
  const hashPass = await hashPassword(data.password);

  const save = await Auth.create({
    username: data.username,
    password: hashPass,
    email: data.email,
  });

  return save;
};

const verifyUser = async (data: any) => {
  const isUserExit = await Auth.findOne({ email: data.email }).lean();
  if (!isUserExit) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  const isPasswordMatch = await comparePassword(
    data.password,
    isUserExit.password
  );

  if (!isPasswordMatch) {
    throw new AppError("Password not match", httpStatus.UNAUTHORIZED);
  }

  return isUserExit;
};

export const AuthService = {
  saveUser,
  verifyUser,
};
