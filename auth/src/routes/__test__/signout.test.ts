import request from "supertest";
import {app} from "../../app";

it('should clear cookie', async () => {
    const signinRes = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    const signoutRes = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    expect(signinRes.get('Set-Cookie')).toBeDefined();
    expect(signoutRes.get('Set-Cookie')[0]).toEqual("express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
});