import * as userRepository from "../repositories/userRepository";
import * as postRepository from "../repositories/postRepository";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export async function getPosts(id: number) {
	await checkUser(id);

	const result = await postRepository.findById(id);

	const posts = result.map(item => {
		return {
			id: item.id,
			userId: item.userId,
			username: item.user.username,
			chatroomId: item.chatroomId,
			chatroom: item.chatroom.title,
			type: item.type,
			fromNow: dayjs(item.createdAt).fromNow()
		};
	});

	return posts;
}

async function checkUser(id: number) {
	const existingUser = await userRepository.findById(id);
	if (!existingUser) throw { code: "notfound_error", message: "User not found" };
}