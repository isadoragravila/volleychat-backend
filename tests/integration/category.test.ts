import app from "../../src/index";
import supertest from "supertest";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import { registerBody } from "../factories/dataFactory";

beforeEach(async () => {
	await deleteAllData();
});

const agent = supertest(app);

describe("GET /categories", () => {
	it("returns 200 for success and an array as the response data", async () => {
		const body = await registerBody();
		await agent.post("/sign-up").send(body);

		const login = await agent.post("/sign-in").send({
			username: body.username,
			password: body.password
		});

		const token = login.body.token;

		const result = await agent.get("/categories").set("Authorization", `Bearer ${token}`);

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Array);
	});
});

afterAll(async () => {
	await disconnectPrisma();
});