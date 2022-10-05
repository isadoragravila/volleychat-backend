import jwt from 'jsonwebtoken';
import { chatBody } from "./dataFactory";
import { prisma } from "../../src/databases/database";

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
        throw { code: "unauthorized_error", message: "Invalid token" };
    }
}