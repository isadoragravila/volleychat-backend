import { IRegisterData } from "../types/authTypes";
import * as authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/unauthorizedError";
import { conflictError } from "../errors/conflictError";
import exclude from "../utils/exclude";
import { Users } from "@prisma/client";

export async function registerUser(registerData: IRegisterData) {
	const { username, email, password } = registerData;

	const existingEmail = await checkEmail(email);
	if (existingEmail) throw conflictError("This email is already in use, please select another one");

	const existingUsername = await checkUsername(username);
	if (existingUsername) throw conflictError("This username is already in use, please select another one");

	const encryptedPassword = encryptPassword(password);

	await authRepository.insert({ ...registerData, password: encryptedPassword });

	return "User successfully registered!";
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

export async function loginUser(username: string, password: string) {
	const user: Users = await checkUsernameAndPassword(username, password);

	const token = generateToken(user.id);

	const userData = exclude(user, "email", "password", "id");

	return { ...userData, userId: user.id, token };
}

async function checkUsernameAndPassword(username: string, password: string) {
	const user = await checkUsername(username);

	if (!user) throw unauthorizedError("Wrong username or password!");

	const encryptedPassword = user.password;

	if (!bcrypt.compareSync(password, encryptedPassword)) throw unauthorizedError("Wrong username or password!");

	return user;
}

function generateToken(id: number) {
	const data = { id };
	const SECRET = process.env.JWT_SECRET || "";
	const EXPIRES_IN = Number(process.env.TOKEN_EXPIRES_IN);
	const options = { expiresIn: EXPIRES_IN };

	return jwt.sign(data, SECRET, options);
}