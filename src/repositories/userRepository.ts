import { prisma } from '../databases/database';

export async function findById(id: number) {
    const user = await prisma.users.findUnique({
        where: { id }
    });
    return user;
}

export async function insertParticipant(userId:number, chatroomId: number) {
    await prisma.participants.create({ 
        data: { userId, chatroomId }
    })
}

export async function findByUserId(userId: number, chatroomId: number) {
    const user = await prisma.participants.findFirst({
        where: { userId, chatroomId }
    });
    return user;
}

export async function findByChatroomId(chatroomId: number) {
    const participants = await prisma.participants.findMany({
        where: { chatroomId },
        select: {
            user: {
                select: {
                    username: true
                }
            }
        }
    });

    return participants;
}