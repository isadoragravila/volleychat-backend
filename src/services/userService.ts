import { IProfileData } from "../types/authTypes";
import * as userRepository from "../repositories/userRepository";
import * as chatRepository from "../repositories/chatRepository";
import * as postRepository from "../repositories/postRepository";

export async function findUserById(id: number) {
	const existingUser = await userRepository.findById(id);
	if (!existingUser) throw { code: "notfound_error", message: "User not found" };
	const user: IProfileData = { ...existingUser };

	delete user.password;

	return user;
}

export async function enterChat(userId: number, chatroomId: number) {
	await removeByLastStatus();
    
	await checkChatroomId(chatroomId);

	const participant = await checkUserIdIntoChatroom(userId, chatroomId);

	if (participant) throw { code: "conflict_error", message: "User is already a member of this chatroom" };

	const lastStatus = Date.now();

	await userRepository.insertParticipant(userId, chatroomId, lastStatus);

	await postRepository.insert({
		userId: userId,
		chatroomId: chatroomId,
		type: "entered"
	});

	return "Entered chat";
}

async function checkChatroomId(id: number) {
	const chatroom = await chatRepository.findById(id);
	if (!chatroom) throw { code: "notfound_error", message: "Chatroom not found" };
}

async function checkUserIdIntoChatroom(userId: number, chatroomId: number) {
	const participant = await userRepository.findByUserId(userId, chatroomId);

	return participant;
}

export async function getParticipants(chatroomId: number) {
	await removeByLastStatus();
    
	await checkChatroomId(chatroomId);

	const result = await userRepository.findByChatroomId(chatroomId);

	const participants = result.map(item => {
		return {
			id: item.user.id,
			name: item.user.username
		};
	});

	return participants;
}

export async function removeParticipant(userId: number, chatroomId: number) {
	await checkChatroomId(chatroomId);

	const participant = await checkUserIdIntoChatroom(userId, chatroomId);

	if (!participant) throw { code: "notfound_error", message: "User isn't in this chatroom" };

	await userRepository.removeParticipant(userId, chatroomId);

	return "Left chat";
}

export async function updateStatus(userId: number, chatroomId: number) {
	await checkChatroomId(chatroomId);

	const participant = await checkUserIdIntoChatroom(userId, chatroomId);

	if (!participant) throw { code: "notfound_error", message: "User isn't in this chatroom" };

	const lastStatus = Date.now();

	await userRepository.update(participant.id, lastStatus);

	return "Updated status";
}

export async function removeByLastStatus() {
	const time = Date.now() - 10000;

	await userRepository.removeByLastStatus(time); 
}

export async function getProfileById(id: number) {
	const user = await userRepository.findById(id);
	if (!user) throw { code: "notfound_error", message: "User not found" };

	const userData = { id: user.id, username: user.username, image: user.image, bio: user.bio };

	return userData;
}