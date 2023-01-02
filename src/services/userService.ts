import { IProfileData } from "../types/authTypes";
import * as userRepository from "../repositories/userRepository";
import * as chatRepository from "../repositories/chatRepository";
import { notFoundError } from "../errors/notFoundError";

export async function findUserById(id: number) {
	const existingUser = await userRepository.findById(id);
	if (!existingUser) throw notFoundError("User not found");
	const user: IProfileData = { ...existingUser };

	delete user.password;

	return user;
}

export async function enterChat(userId: number, chatroomId: number) {
	await removeByLastStatus();
    
	await checkChatroomId(chatroomId);

	const participant = await checkUserIdIntoChatroom(userId, chatroomId);

	if (participant) throw notFoundError("Something went wrong, wait a few seconds and try again");

	const lastStatus = Date.now();

	await userRepository.insertParticipant(userId, chatroomId, lastStatus);

	return "Entered chat";
}

async function checkChatroomId(id: number) {
	const chatroom = await chatRepository.findById(id);
	if (!chatroom) throw notFoundError("Chatroom not found");
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

	if (!participant) throw notFoundError("Something went wrong!");

	await userRepository.removeParticipant(userId, chatroomId);

	return "Left chat";
}

export async function updateStatus(userId: number, chatroomId: number) {
	await checkChatroomId(chatroomId);

	const participant = await checkUserIdIntoChatroom(userId, chatroomId);

	if (!participant) throw notFoundError("Something went wrong, so you'll be redirected to the main page.");

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
	if (!user) throw notFoundError("User not found");

	const userData = { id: user.id, username: user.username, image: user.image, bio: user.bio };

	return userData;
}