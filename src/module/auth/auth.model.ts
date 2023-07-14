import { Schema, model } from "mongoose";
import { AuthModel, IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    }
})

export const Auth = model<IAuth, AuthModel>('User', authSchema);
