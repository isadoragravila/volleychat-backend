import { prisma } from '../databases/database';

export async function findAll() {
    const categories = await prisma.categories.findMany();
    return categories;
}