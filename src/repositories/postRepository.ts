import { prisma } from "../databases/database";
import { IPostData } from "../types/postTypes";

export async function insert(postData: IPostData) {
	return await prisma.posts.create({
		data: postData
	});
}