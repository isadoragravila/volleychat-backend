import { Request, Response } from 'express';
import { IRegisterData } from '../types/authTypes';
import * as authService from '../services/authService';

export async function registerUser(req: Request, res: Response) {
    const registerData: IRegisterData = req.body;

    const result = await authService.registerUser(registerData);
    
    res.status(201).send(result);
}