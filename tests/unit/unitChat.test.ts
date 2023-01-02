import * as chatService from "../../src/services/chatService";
import * as chatRepository from "../../src/repositories/chatRepository";
import * as categoryRepository from "../../src/repositories/categoryRepository";
import { chatBody } from "../factories/dataFactory";
import { categoryData, chatData, getChatsData } from "../factories/mockDataFactory";
import { notFoundError } from "../../src/errors/notFoundError";

beforeEach(() => {
	jest.resetAllMocks();
	jest.clearAllMocks();
});

describe("Tests chat creation", () => {
	it("Should create a new chat", async () => {
		const chat = await chatBody();
		const creatorId = 1;

		const category = await categoryData();

		const chatDone = await chatData();

		jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(category);

		jest.spyOn(chatRepository, "insert").mockResolvedValueOnce(chatDone);

		await chatService.createChat({ ...chat, categoryId: category.id, creatorId});

		expect(categoryRepository.findById).toBeCalledTimes(1);
		expect(chatRepository.insert).toBeCalledTimes(1);
	});

	it("Shouldn't create a new chat, because category doesn't exists", async () => {
		const chat = await chatBody();
		const creatorId = 1;
		const categoryId= 1000;

		jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(null);

		jest.spyOn(chatRepository, "insert");

		const result = chatService.createChat({ ...chat, categoryId, creatorId});

		await expect(result).rejects.toEqual(notFoundError("Category not found"));

		expect(categoryRepository.findById).toBeCalledTimes(1);
		expect(chatRepository.insert).not.toBeCalled();
	});
});

describe("Tests get chats by category", () => {
	it("Should return an object with an array of chatrooms", async () => {
		const category = await categoryData();
		const chats = await getChatsData();

		jest.spyOn(categoryRepository, "findById").mockResolvedValueOnce(category);

		jest.spyOn(chatRepository, "findByCategoryId").mockResolvedValueOnce(chats);

		const result = await chatService.getChats(category.id);

		expect(categoryRepository.findById).toBeCalledTimes(1);
		expect(chatRepository.findByCategoryId).toBeCalledTimes(1);
		expect(result.chatrooms[0]).toHaveProperty("fromNow");
	});
});