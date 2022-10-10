import { chatBody, messageBody, registerBody } from "./dataFactory";

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
		const chat = await chatData(i + 1);
		chatrooms.push(chat);
	}

	return { ...category, chatrooms };
}

export async function messageData(id?: number) {
	const message = await messageBody();

	return {
		id: id || 1,
		content: message.content,
		chatroomId: 1,
		userId: 1,
		createdAt: new Date()
	};
}

export async function getMessagesData() {
	const chat = await chatData();
	const { content } = await messageBody();
	const { username } = await registerBody();

	return {
		id: chat.id,
		title: chat.title,
		messages: [
			{
				id: 1,
				content,
				chatroomId: chat.id,
				userId: 1,
				createdAt: new Date(),
				user: {
					username
				}
			}
		]
	};
}
