import app from '../../src/index';
import supertest from 'supertest';
import { prisma } from '../../src/databases/database';
import { deleteAllData, disconnectPrisma } from '../factories/scenarioFactory';
import { registerBody, wrongDataBody } from '../factories/dataFactory';

beforeEach(async () => {
    await deleteAllData();
});

const agent = supertest(app);

describe('POST /sign-up', () => {
    it('returns 422 for invalid input', async () => {
        const result = await agent.post('/sign-up').send({});

        expect(result.status).toBe(422);
    });

    it('returns 409 for using an existing username or email in the database', async () => {
        const body = await registerBody();

        await agent.post('/sign-up').send(body);

        const result = await agent.post('/sign-up').send(body);

        expect(result.status).toBe(409);
    });

    it('returns 201 for valid input and right insert in the database', async () => {
        const body = await registerBody();

        const result = await agent.post('/sign-up').send(body);

        const createdUser = await prisma.users.findUnique({
            where: { username: body.username }
        });

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull;
    });
});

describe('POST /sign-in', () => {
    it('returns 422 for invalid input', async () => {
        const body = await registerBody();

        await agent.post('/sign-up').send(body);

        const result = await agent.post('/sign-in').send({});

        expect(result.status).toBe(422);
    });

    it('returns 401 for wrong credentials', async () => {
        const body = await registerBody();

        await agent.post('/sign-up').send(body);

        const wrongBody = await wrongDataBody();

        const firstTry = await agent.post('/sign-in').send({
            username: wrongBody.username,
            password: body.password
        });
        expect(firstTry.status).toBe(401);

        const secondTry = await agent.post('/sign-in').send({
            username: body.username,
            password: wrongBody.password
        });
        expect(secondTry.status).toBe(401);
    });

    it('returns 200 for valid input and right credentials', async () => {
        const body = await registerBody();
        await agent.post('/sign-up').send(body);

        const result = await agent.post('/sign-in').send({
            username: body.username,
            password: body.password
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('token');
    });
});

afterAll(async () => {
    await disconnectPrisma();
});