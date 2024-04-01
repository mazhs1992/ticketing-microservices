import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('returns a 404 if ticket is not found', async () => {
     await request(app)
        .get('/api/tickets/kjnadwikuiib')
        .send({})
        .expect(404)
  })


it('returns the ticket if the ticket is found', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())   
    .send({
        title:'concert',
        price: '10'
    })
    .expect(201)

    await request(app)
       .post('/api/tickets')
       .send({})
       .expect(404)
 })
