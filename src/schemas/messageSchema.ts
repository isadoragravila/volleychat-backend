import joi from "joi";
import { IMessageSchema } from "../types/messageTypes";

const messageSchema = joi.object<IMessageSchema>({
	content: joi.string().required().label("message must have a content to be sent")
});

export default messageSchema;