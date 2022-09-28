import { IRegisterData } from "../types/authTypes";
import * as authRepository from "../repositories/authRepository";
import bcrypt from 'bcrypt';

export async function registerUser(registerData: IRegisterData) {
    const { username, email, password } = registerData;

    const existingEmail = await checkEmail(email);
    if (existingEmail) throw { code: "conflict_error", message: "This email is already registered in the database" };

    const existingUsername = await checkUsername(username);
    if (existingUsername) throw { code: "conflict_error", message: "This username is already in use, please select another one" };

    const encryptedPassword = encryptPassword(password);

    await authRepository.insert({ ...registerData, password: encryptedPassword });

    return "User successfully registered!"
}

async function checkEmail(email: string) {
    return await authRepository.findByEmail(email);
}

async function checkUsername(username: string) {
    return await authRepository.findByUsername(username);
}

function encryptPassword(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}