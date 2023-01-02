import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { schemaError } from "../errors/schemaError";

export default function validateSchema(schema: ObjectSchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body, {abortEarly: false});
		if (error) {
			throw schemaError(error.details.map((detail) => `\n${detail.context?.label}`));
		}

		next();
	};
}