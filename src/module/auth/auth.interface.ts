import { Model } from "mongoose";

export interface IAuth {
    username: string;
    password: string;
    email: string;
}

export type AuthModel = Model<IAuth, Record<string, unknown>>;
