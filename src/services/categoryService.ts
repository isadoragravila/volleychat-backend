import * as categoryRepository from "../repositories/categoryRepository";

export async function getCategories() {
	const categories = await categoryRepository.findAll();

	return categories;
}