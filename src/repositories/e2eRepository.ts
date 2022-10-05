import { prisma } from "../databases/database";

export async function truncate() {
	await prisma.$transaction([
		prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE chatrooms RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE participants RESTART IDENTITY CASCADE`,
		prisma.$executeRaw`TRUNCATE TABLE messages RESTART IDENTITY CASCADE`
	]);
}