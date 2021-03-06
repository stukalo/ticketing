import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';
import request from "supertest";

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'test_jwt_key';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]>;
        }
    }
}

global.signup = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const res = await request(app)
        .post('/api/users/signup')
        .send({ email, password })

    return res.get('Set-Cookie');
}