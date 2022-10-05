import app from "../../src/index";
import supertest from "supertest";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import { chatBody, registerBody } from "../factories/dataFactory";
import { prisma } from "../../src/databases/database";
import { createChat } from "../factories/createFactory";

beforeEach(async () => {
	await deleteAllData();
});

const agent = supertest(app);

describe("POST /chats/create/:categoryId", () => {
	it("returns 201 for valid input and right insert in the database", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const chat = await chatBody();

		const result = await agent.post(`/chats/create/${categoryId}`).set("Authorization", `Bearer ${token}`).send(chat);

		const createdChat = await prisma.chatrooms.findFirst({
			where: { title: chat.title }
		});

		expect(result.status).toBe(201);
		expect(createdChat).not.toBeNull;
	});

	it("returns 404 for nonexistent category", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 10;

		const chat = await chatBody();

		const result = await agent.post(`/chats/create/${categoryId}`).set("Authorization", `Bearer ${token}`).send(chat);

		expect(result.status).toBe(404);
	});
});

describe("GET /chats/:categoryId", () => {
	it("returns 200 for success and an object as the response data", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		await createChat(categoryId, token);

		const result = await agent.get(`/chats/${categoryId}`).set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(200);
		expect(result.body).toHaveProperty("name");
		expect(result.body.chatrooms).toBeInstanceOf(Array);
	});
});

afterAll(async () => {
	await disconnectPrisma();
});