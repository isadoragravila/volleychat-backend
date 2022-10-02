import { prisma } from '../databases/database';
import { IMessageData } from '../types/messageTypes';

export async function insert(messageData: IMessageData) {
    return await prisma.messages.create({
        data: messageData
    });
}