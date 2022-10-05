import { prisma } from "../databases/database";

export async function findAll() {
	const categories = await prisma.categories.findMany();
	return categories;
}

export async function findById(id: number) {
	const category = await prisma.categories.findUnique({
		where: { id }
	});
	return category;
}