import { Request, Response } from 'express';
import { IChatSchema } from '../types/chatTypes';
import * as chatService from '../services/chatService';

export async function createChat(req: Request, res: Response) {
    const { title, description }: IChatSchema = req.body;
    const { categoryId } = req.params;
    const creatorId = res.locals.userId;

    const result = await chatService.createChat({title, description, categoryId: Number(categoryId) ,creatorId});
    
    res.status(201).send(result);
}

export async function getChats (req: Request, res: Response) {
    const { categoryId } = req.params;

    const result = await chatService.getChats(Number(categoryId));

    res.status(200).send(result);
}