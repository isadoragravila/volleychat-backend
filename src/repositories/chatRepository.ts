import { prisma } from '../databases/database';
import { IChatData } from '../types/chatTypes';

export async function insert(chatData: IChatData) {
    await prisma.chatrooms.create({
        data: chatData
    });
}

export async function findByCategoryId(categoryId: number) {
    const chatrooms = await prisma.categories.findUnique({
        where: { id: categoryId },
        include: { chatrooms: true }
    });
    return chatrooms;
}