import { ApplicationError } from "../middlewares/errorHandler";

export function schemaError(message: string[]): ApplicationError {
	return {
		code: "schema_error",
		message
	};
}