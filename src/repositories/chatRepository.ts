import { prisma } from '../databases/database';
import { IChatData } from '../types/chatTypes';

export async function insert(chatData: IChatData) {
    await prisma.chatrooms.create({
        data: chatData
    });
}