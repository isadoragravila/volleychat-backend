import { Request, Response } from "express";
import * as postService from "../services/postService";

export async function getPosts (req: Request, res: Response) {
	const { id } = req.params;

	const result = await postService.getPosts(Number(id));

	res.status(200).send(result);
}