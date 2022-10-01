import { Request, Response } from 'express';
import { IProfileData } from '../types/authTypes';
import * as userService from '../services/userService';

export async function sendProfileInfo(req: Request, res: Response) {
    const user = res.locals.user as IProfileData;

    res.status(200).send(user);
}

export async function enterChat(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { chatroomId } = req.params;

    const result = await userService.enterChat(Number(userId), Number(chatroomId));

    res.status(200).send(result);
}