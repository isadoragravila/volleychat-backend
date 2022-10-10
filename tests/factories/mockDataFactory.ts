import { chatBody } from "./dataFactory";

export async function chatData(id?: number) {
	const chat = await chatBody();

	return {
		id: id || 1,
		title: chat.title,
		description: chat.description,
		private: false,
		categoryId: 1,
		creatorId: 1,
		createdAt: new Date()
	};
}

export async function categoryData() {
	return {
		id: 1,
		name: "women's volleyball"
	};
}

export async function getChatsData() {
	const category = await categoryData();

	const chatrooms = [];
	for (let i = 0; i < 3; i++) {
		const chat = await chatData(i+1);
		chatrooms.push(chat);
	}

	return { ...category, chatrooms };
}