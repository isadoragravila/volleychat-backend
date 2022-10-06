import { prisma } from "../databases/database";
import { IPostData } from "../types/postTypes";

export async function insert(postData: IPostData) {
	return await prisma.posts.create({
		data: postData
	});
}

export async function findById(userId: number) {
	return await prisma.posts.findMany({
		where: { userId },
		orderBy: {
			createdAt: "desc"
		}
	});
}