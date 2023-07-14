import { hashPassword } from "../../helpers/hashPassword";
import { IAuth } from "./auth.interface"
import { Auth } from "./auth.model";

const saveUser = async(data: IAuth) => {
    const hashPass =  await hashPassword(data.password);

    const save = await Auth.create({username: data.username, password: hashPass, email: data.email})

    return save;
}

export const AuthService = {
    saveUser
}