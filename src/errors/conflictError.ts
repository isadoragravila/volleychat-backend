import { ApplicationError } from "../middlewares/errorHandler";

export function conflictError(message: string): ApplicationError {
	return {
		code: "conflict_error",
		message
	};
}