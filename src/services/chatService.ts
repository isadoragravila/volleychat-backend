import * as chatRepository from "../repositories/chatRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import { IChatData } from "../types/chatTypes";

export async function createChat(chatData: IChatData) {
    await checkCategory(chatData.categoryId);

    await chatRepository.insert(chatData);

    return "Chatroom successfully created!";
}

export async function checkCategory(id: number) {
    const category = await categoryRepository.findById(id);
    if (!category) throw { code: "notfound_error", message: "Category not found" };
}