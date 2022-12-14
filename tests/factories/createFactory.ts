import jwt from "jsonwebtoken";
import { chatBody, messageBody } from "./dataFactory";
import { prisma } from "../../src/databases/database";
import { unauthorizedError } from "../../src/errors/unauthorizedError";

interface IJwtPayload {
    id: number
}

export async function createChat(categoryId: number, token: string) {
	const body = await chatBody();
	const creatorId = await getUserIdFromToken(token);

	const createdChat = await prisma.chatrooms.create({
		data: { ...body, categoryId, creatorId }
	});
	return createdChat;
}

async function getUserIdFromToken(token: string) {
	const SECRET = process.env.JWT_SECRET || "";

	try {
		const { id } = jwt.verify(token, SECRET) as IJwtPayload;
		return id;
	} catch (error) {
		throw unauthorizedError("Invalid token");
	}
}

export async function createMessage(chatroomId: number, token: string) {
	const body = await messageBody();
	const userId = await getUserIdFromToken(token);

	const createdMessage = await prisma.messages.create({
		data: { ...body, chatroomId, userId }
	});
	return createdMessage;
}

export async function createParticipant(chatroomId: number, token: string) {
	const userId = await getUserIdFromToken(token);
	const lastStatus = Date.now() - 10000;
    
	const created = await prisma.participants.create({
		data: { chatroomId, userId, lastStatus }
	});
	return created;

}