import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export async function getCategories(req: Request, res: Response) {

    const result = await categoryService.getCategories();
    
    res.status(200).send(result);
}