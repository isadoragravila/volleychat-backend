import { notFoundError } from "../errors/notFoundError";
import * as chatRepository from "../repositories/chatRepository";
import * as messageRepository from "../repositories/messageRepository";
import { IMessageData } from "../types/messageTypes";

export async function createMessage(messageData: IMessageData) {
	await checkChatroomId(messageData.chatroomId);

	const message = await messageRepository.insert(messageData);

	return message;
}

async function checkChatroomId(id: number) {
	const chatroom = await chatRepository.findById(id);
	if (!chatroom) throw notFoundError("Chatroom not found");
}

export async function getMessages(chatroomId: number, userId: number) {
	await checkChatroomId(chatroomId);

	const result = await messageRepository.findByChatId(chatroomId);

	const messages = { userId, ...result };

	return messages;
}