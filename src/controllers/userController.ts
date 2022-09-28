import { Request, Response } from 'express';
import { IProfileData } from '../types/authTypes';

export async function sendProfileInfo(req: Request, res: Response) {
    const user = res.locals.user as IProfileData;

    res.status(200).send(user);
}