import { Request, Response } from "express";
import { IMessageSchema } from "../types/messageTypes";
import * as messageService from "../services/messageService";

export async function createMessage(req: Request, res: Response) {
	const { content }: IMessageSchema = req.body;
	const { chatroomId } = req.params;
	const userId = res.locals.userId;

	const result = await messageService.createMessage({ content, chatroomId: Number(chatroomId), userId });
    
	res.status(201).send(result);
}

export async function getMessages (req: Request, res: Response) {
	const { chatroomId } = req.params;
	const userId = res.locals.userId;

	const result = await messageService.getMessages(Number(chatroomId), userId);

	res.status(200).send(result);
}