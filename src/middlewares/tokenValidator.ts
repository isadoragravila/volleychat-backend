import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/unauthorizedError";
import * as userService from "../services/userService";

interface IJwtPayload {
    id: number
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	const SECRET = process.env.JWT_SECRET || "";

	if (!token) throw unauthorizedError("Missing token");

	try {
		const { id } = jwt.verify(token, SECRET) as IJwtPayload;

		const user = await userService.findUserById(id);

		res.locals.userId = id;
		res.locals.user = user;

		next();

	} catch (error) {
		throw unauthorizedError("Invalid token");
	}
}

export default validateToken;