import request from "supertest";
import {app} from "../../app";

it('should return current user info', async () => {
    const cookie = await global.signup();

    const currentUserRes = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(currentUserRes.body.currentUser.email).toEqual('test@test.com');
});


