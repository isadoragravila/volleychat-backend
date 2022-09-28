import { prisma } from '../databases/database';
import { IRegisterData } from '../types/authTypes';

export async function findByEmail(email: string) {
    const user = await prisma.users.findUnique({
        where: { email }
    });
    return user;
}

export async function findByUsername(username: string) {
    const user = await prisma.users.findUnique({
        where: { username }
    });
    return user;
}

export async function insert(userData: IRegisterData) {
    await prisma.users.create({
        data: userData
    });
}