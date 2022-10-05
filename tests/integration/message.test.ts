import app from '../../src/index';
import supertest from 'supertest';
import { deleteAllData, disconnectPrisma } from '../factories/scenarioFactory';
import { messageBody, registerBody } from '../factories/dataFactory';
import { prisma } from '../../src/databases/database';
import { createChat, createMessage } from '../factories/createFactory';

beforeEach(async () => {
    await deleteAllData();
});

const agent = supertest(app);

describe('POST /messages/:chatroomId', () => {
    it('returns 201 for valid input and right insert in the database', async () => {
        const body = await registerBody();
        await agent.post('/sign-up').send(body);

        const login = await agent.post('/sign-in').send({
            username: body.username,
            password: body.password
        });

        const token = login.body.token;
        const categoryId = 1;

        const { id } = await createChat(categoryId, token);

        const message = await messageBody();

        const result = await agent.post(`/messages/${id}`).set('Authorization', `Bearer ${token}`).send(message);

        const createdMessage = await prisma.messages.findFirst({
            where: { content: message.content }
        })

        expect(result.status).toBe(201);
        expect(createdMessage).not.toBeNull;
    });

    it('returns 404 for nonexistent chatroom', async () => {
        const body = await registerBody();
        await agent.post('/sign-up').send(body);

        const login = await agent.post('/sign-in').send({
            username: body.username,
            password: body.password
        });

        const token = login.body.token;
        const categoryId = 1;

        await createChat(categoryId, token);

        const message = await messageBody();

        const result = await agent.post(`/messages/${1000}`).set('Authorization', `Bearer ${token}`).send(message);

        expect(result.status).toBe(404);
    });
});

describe('GET /messages/:chatroomId', () => {
    it('returns 200 for success and right response data', async () => {
        const body = await registerBody();
        await agent.post('/sign-up').send(body);

        const login = await agent.post('/sign-in').send({
            username: body.username,
            password: body.password
        });

        const token = login.body.token;
        const categoryId = 1;

        const { id } = await createChat(categoryId, token);

        await createMessage(id, token);

        const result = await agent.get(`/messages/${id}`).set('Authorization', `Bearer ${token}`);

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("title");
        expect(result.body.messages).toBeInstanceOf(Array);
    });
});

afterAll(async () => {
    await disconnectPrisma();
});