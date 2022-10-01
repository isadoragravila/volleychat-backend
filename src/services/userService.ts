import { IProfileData } from "../types/authTypes";
import * as userRepository from "../repositories/userRepository";
import * as chatRepository from "../repositories/chatRepository";

export async function findUserById(id: number) {
    const existingUser = await userRepository.findById(id);
    if (!existingUser) throw { code: "notfound_error", message: "User not found" };
    const user: IProfileData = { ...existingUser };

    delete user.password;

    return user;
}

export async function enterChat(userId: number, chatroomId: number) {
    await checkChatroomId(chatroomId);

    await userRepository.insertParticipant(userId, chatroomId);

    return "Entered chat";
}

async function checkChatroomId(id: number) {
    const chatroom = await chatRepository.findById(id);
    if (!chatroom) throw { code: "notfound_error", message: "Chatroom not found" };
}