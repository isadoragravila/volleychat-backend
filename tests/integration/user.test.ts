import app from "../../src/index";
import supertest from "supertest";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import { messageBody, registerBody } from "../factories/dataFactory";
import { prisma } from "../../src/databases/database";
import { createChat, createMessage, createParticipant } from "../factories/createFactory";
import { IProfileData } from "../../src/types/authTypes";

beforeEach(async () => {
	await deleteAllData();
});

const agent = supertest(app);

describe("GET /profile", () => {
	it("returns 200 for success", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;

		const result = await agent.get("/profile").set("Authorization", `Bearer ${token}`);

		const createdUser = await prisma.users.findUnique({
			where: { username: body.username }
		});

		const user: IProfileData = { ...createdUser };
		delete user.password;

		expect(result.status).toBe(200);
		expect(result.body).toMatchObject(user);
	});

	it("returns 401 for invalid or missing token", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;

		const result = await agent.get("/profile").set("Authorization", "Bearer token_invalido");

		expect(result.status).toBe(401);
	});
});

describe("POST /participants/:chatroomId", () => {
	it("returns 201 for right insert in the database", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);

		const result = await agent.post(`/participants/${id}`).set("Authorization", `Bearer ${token}`).send();

		const participant = await prisma.participants.findFirst({
			where: { chatroomId: id }
		});

		expect(result.status).toBe(201);
		expect(participant).not.toBeNull;
	});

	it("returns 409 for insert an user tha already is in the chatroom", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);

		await agent.post(`/participants/${id}`).set("Authorization", `Bearer ${token}`).send();

		const result = await agent.post(`/participants/${id}`).set("Authorization", `Bearer ${token}`).send();

		expect(result.status).toBe(409);
	});
});


describe("DELETE /participants/:chatroomId", () => {
	it("returns 200 for right removal from the database", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);
        
		await agent.post(`/participants/${id}`).set("Authorization", `Bearer ${token}`).send();

		const result = await agent.delete(`/participants/${id}`).set("Authorization", `Bearer ${token}`);

		const participant = await prisma.participants.findFirst({
			where: { chatroomId: id }
		});

		expect(result.status).toBe(200);
		expect(participant).toBeNull;
	});

	it("returns 404 for user that is not in the chatroom", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);

		const result = await agent.delete(`/participants/${id}`).set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(404);
	});
});

describe("GET /participants/:chatroomId", () => {
	it("returns 200 for success and right response data", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);
        
		await agent.post(`/participants/${id}`).set("Authorization", `Bearer ${token}`).send();

		const result = await agent.get(`/participants/${id}`).set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
		expect(result.body[0]).toHaveProperty("name");
	});

	it("returns 200 for success and an empty array", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);
        
		await createParticipant(id, token);

		const result = await agent.get(`/participants/${id}`).set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
		expect(result.body.length).toBe(0);
	});
});

describe("PATCH /participants/:chatroomId", () => {
	it("returns 200 for success", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const categoryId = 1;

		const { id } = await createChat(categoryId, token);

		const { lastStatus } = await createParticipant(id, token);

		const result = await agent.patch(`/participants/${id}/status`).set("Authorization", `Bearer ${token}`).send();

		const participant = await prisma.participants.findFirst({
			where: { chatroomId: id }
		});

		expect(result.status).toBe(200);
		expect(participant?.lastStatus).toBeGreaterThan(lastStatus);
	});
});

describe("GET /profile/:id", () => {
	it("returns 200 for success", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;
		const userId = login.body.userId;

		const result = await agent.get(`/profile/${userId}`).set("Authorization", `Bearer ${token}`);

		const createdUser = await prisma.users.findUnique({
			where: { username: body.username }
		});

		const user: IProfileData = { ...createdUser };
		delete user.password;
		delete user.email;

		expect(result.status).toBe(200);
		expect(result.body).toMatchObject(user);
	});

	it("returns 404 for user not found", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;

		const result = await agent.get("/profile/1000").set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(404);
	});
});

afterAll(async () => {
	await disconnectPrisma();
});