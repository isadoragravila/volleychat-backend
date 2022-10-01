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