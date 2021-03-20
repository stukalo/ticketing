import request from 'supertest';
import {app} from '../../app';

const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        });
}

it('should fetch a list of tickets', async () => {
    await createTicket('title-1', 10);
    await createTicket('title-2', 11);
    await createTicket('title-3', 12);

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});