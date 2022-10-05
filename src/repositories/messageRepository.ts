import { prisma } from "../databases/database";
import { IMessageData } from "../types/messageTypes";

export async function insert(messageData: IMessageData) {
	return await prisma.messages.create({
		data: messageData
	});
}

export async function findByChatId(chatroomId: number) {
	const messages = await prisma.chatrooms.findUnique({
		where: { id: chatroomId },
		select: { 
			id: true,
			title: true,
			messages: {
				orderBy: {
					createdAt: "desc"
				},
				include: {
					user: {
						select: {
							username: true
						}
					}
				}
			}
		}
	});
	return messages;
}