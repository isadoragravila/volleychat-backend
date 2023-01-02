import * as messageService from "../../src/services/messageService";
import * as chatRepository from "../../src/repositories/chatRepository";
import * as messageRepository from "../../src/repositories/messageRepository";
import { messageBody } from "../factories/dataFactory";
import { chatData, getMessagesData, messageData } from "../factories/mockDataFactory";
import { notFoundError } from "../../src/errors/notFoundError";

beforeEach(() => {
	jest.resetAllMocks();
	jest.clearAllMocks();
});

describe("Tests message creation", () => {
	it("Should send a new message", async () => {
		const message = await messageBody();
		const userId = 1;
		const chatroomId = 1;
		const chatroom = await chatData();
		const messageDone = await messageData();

		jest.spyOn(chatRepository, "findById").mockResolvedValueOnce(chatroom);

		jest.spyOn(messageRepository, "insert").mockResolvedValueOnce(messageDone);

		await messageService.createMessage({ ...message, chatroomId, userId});

		expect(chatRepository.findById).toBeCalledTimes(1);
		expect(messageRepository.insert).toBeCalledTimes(1);
	});

	it("Shouldn't create a new chat, because category doesn't exists", async () => {
		const message = await messageBody();
		const userId = 1;
		const chatroomId = 1000;

		jest.spyOn(chatRepository, "findById").mockResolvedValueOnce(null);

		jest.spyOn(messageRepository, "insert");

		const result = messageService.createMessage({ ...message, chatroomId, userId});

		await expect(result).rejects.toEqual(notFoundError("Chatroom not found"));

		expect(chatRepository.findById).toBeCalledTimes(1);
		expect(messageRepository.insert).not.toBeCalled();
	});
});

describe("Tests get chats by category", () => {
	it("Should return an object with an array of messages", async () => {
		const messages = await getMessagesData();
		const chatroom = await chatData();
		const userId = 1;

		jest.spyOn(chatRepository, "findById").mockResolvedValueOnce(chatroom);

		jest.spyOn(messageRepository, "findByChatId").mockResolvedValueOnce(messages);

		const result = await messageService.getMessages(chatroom.id, userId);

		expect(chatRepository.findById).toBeCalledTimes(1);
		expect(messageRepository.findByChatId).toBeCalledTimes(1);
		expect(result).toHaveProperty("userId");
	});
});