import { ApplicationError } from "../middlewares/errorHandler";

export function notFoundError(message: string): ApplicationError {
	return {
		code: "notfound_error",
		message
	};
}