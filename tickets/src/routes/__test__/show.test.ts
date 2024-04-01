import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('returns a 404 if ticket is not found', async () => {
    const id = new Ticket().id
     await request(app)
        .get(`/api/tickets/${id}`)
        .send({})
        .expect(404)
  })


it('returns the ticket if the ticket is found', async () => {
    const title = 'concert'
    const price = 20

    const responce = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())   
    .send({
        title,
        price
    })
    .expect(201)

   const ticketResponce = await request(app)
       .get(`/api/tickets/${responce.body.id}`)
       .send()
       .expect(200)

    expect(ticketResponce.body.title).toEqual(title)
    expect(ticketResponce.body.price).toEqual(price)
 })
