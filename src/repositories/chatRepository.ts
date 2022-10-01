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
    })
}