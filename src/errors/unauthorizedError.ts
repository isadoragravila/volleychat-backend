import { ApplicationError } from "../middlewares/errorHandler";

export function unauthorizedError(message: string): ApplicationError {
	return {
		code: "unauthorized_error",
		message
	};
}