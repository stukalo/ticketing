import request from 'supertest';
import {app} from '../../app';

it('should return a 201 on successful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);
});

it('should return a 400 with invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: 'password',
        })
        .expect({
            errors: [{
                message: 'Email must be valid',
                field: 'email'
            }],
        })
        .expect(400);
});

it('should return a 400 with invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p',
        })
        .expect({
            errors: [{
                message: 'Password must be between 4 and 20 characters',
                field: 'password',
            }]
        })
        .expect(400);
});

it('should return a 400 with invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect({
            errors: [{
                message: 'Email must be valid', field: 'email'
            }, {
                message: 'Password must be between 4 and 20 characters',
                field: 'password',
            }]
        })
        .expect(400);
});

it('should not allow duplicate email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect({
            errors: [
                {message: 'Email is already exists'},
            ],
        })
        .expect(400);
});

it('should set a cookie on success signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});