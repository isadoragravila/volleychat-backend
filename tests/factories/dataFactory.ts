import { faker } from '@faker-js/faker';

export async function registerBody() {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(10),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        bio: faker.lorem.sentences(2)
    }
}

export async function wrongDataBody() {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(10)
    }
}

export async function chatBody() {
    return {
        title: faker.lorem.words(2),
        description: faker.lorem.sentences(2)
    }
}