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
			...item,
			fromNow: dayjs(item.createdAt).fromNow()
		};
	});

	return posts;
}

async function checkUser(id: number) {
	const existingUser = await userRepository.findById(id);
	if (!existingUser) throw { code: "notfound_error", message: "User not found" };
}