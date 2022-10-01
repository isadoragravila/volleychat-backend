import { prisma } from '../databases/database';

export async function findById(id: number) {
    const user = await prisma.users.findUnique({
        where: { id }
    });
    return user;
}