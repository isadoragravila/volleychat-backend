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

    await checkUserIdIntoChatroom(userId, chatroomId);

    await userRepository.insertParticipant(userId, chatroomId);

    return "Entered chat";
}

async function checkChatroomId(id: number) {
    const chatroom = await chatRepository.findById(id);
    if (!chatroom) throw { code: "notfound_error", message: "Chatroom not found" };
}

async function checkUserIdIntoChatroom(userId: number, chatroomId: number) {
    const participant = await userRepository.findByUserId(userId, chatroomId);
    if (participant) throw { code: "conflict_error", message: "User is already a member of this chatroom" };
}

export async function getParticipants(chatroomId: number) {
    await checkChatroomId(chatroomId);

    const result = await userRepository.findByChatroomId(chatroomId);

    const participants = result.map(item => {
        return {
            user: item.user.username
        }
    })

    return participants;
}