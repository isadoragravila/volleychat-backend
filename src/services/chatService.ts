import * as chatRepository from "../repositories/chatRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import { IChatData } from "../types/chatTypes";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export async function createChat(chatData: IChatData) {
    await checkCategory(chatData.categoryId);

    await chatRepository.insert(chatData);

    return "Chatroom successfully created!";
}

export async function checkCategory(id: number) {
    const category = await categoryRepository.findById(id);
    if (!category) throw { code: "notfound_error", message: "Category not found" };
}

export async function getChats(categoryId: number) {
    await checkCategory(categoryId);

    const result = await chatRepository.findByCategoryId(categoryId);

    const chats = result?.chatrooms.map(item => {
        return {
            ...item,
            fromNow: dayjs(item.createdAt).fromNow()
        }
    });

    return { ...result, chatrooms: chats }
}