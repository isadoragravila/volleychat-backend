import { prisma } from "../../src/databases/database";

export async function deleteAllData() {
	await prisma.$transaction([
		prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE chatrooms RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE participants RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE messages RESTART IDENTITY CASCADE`
	]);
}

export async function disconnectPrisma() {
	await prisma.$disconnect();
}