import { prisma } from "../databases/database";
import { IChatData } from "../types/chatTypes";

export async function insert(chatData: IChatData) {
	return await prisma.chatrooms.create({
		data: chatData
	});
}

export async function findByCategoryId(categoryId: number) {
	const chatrooms = await prisma.categories.findUnique({
		where: { id: categoryId },
		include: {
			chatrooms: {
				orderBy: {
					createdAt: "desc"
				}
			}
		}
	});
	return chatrooms;
}

export async function findById(id: number) {
	return await prisma.chatrooms.findUnique({
		where: { id }
	});
}

export async function findByCreatorId(creatorId: number) {
	const chatrooms = await prisma.chatrooms.findMany({
		where: {
			creatorId
		},
		include: {
			category: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	});
	return chatrooms;
}