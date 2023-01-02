import * as chatRepository from "../repositories/chatRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as userRepository from "../repositories/userRepository";
import { IChatData } from "../types/chatTypes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { removeByLastStatus } from "./userService";
import { notFoundError } from "../errors/notFoundError";

dayjs.extend(relativeTime);

export async function createChat(chatData: IChatData) {
	await checkCategory(chatData.categoryId);

	const chat = await chatRepository.insert(chatData);

	return chat;
}

export async function checkCategory(id: number) {
	const category = await categoryRepository.findById(id);
	if (!category) throw notFoundError("Category not found");
}

export async function getChats(categoryId: number) {
	await removeByLastStatus();
    
	await checkCategory(categoryId);

	const result = await chatRepository.findByCategoryId(categoryId);

	const chats = result?.chatrooms.map(item => {
		return {
			...item,
			fromNow: dayjs(item.createdAt).fromNow()
		};
	}) || [];

	return { ...result, chatrooms: chats };
}

export async function getChatsByCreatorId(creatorId: number) {    
	await removeByLastStatus();
      
	await checkUser(creatorId);

	const result = await chatRepository.findByCreatorId(creatorId);

	return result;
}

export async function checkUser(id: number) {
	const user = await userRepository.findById(id);
	if (!user) throw notFoundError("User not found");
}