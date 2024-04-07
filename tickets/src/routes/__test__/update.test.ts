import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
jest.mock("../../nats-wrapper");

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asldkf",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "asldkf",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const responce = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title: "asldkf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${responce.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asldkf",
      price: 20,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const responce = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "asldkf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${responce.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${responce.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "awdawd",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const responce = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "asldkf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${responce.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 200,
    })
    .expect(200);

    const ticketResponce = await request(app)
    .get(`/api/tickets/${responce.body.id}`)
    .send();

    expect(ticketResponce.body.title).toEqual("new title");
    expect(ticketResponce.body.price).toEqual(200);
});


it('publishes an event', async () => {
  const cookie = global.signin();
  const responce = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "asldkf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${responce.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 200,
    })
    .expect(200);

 

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})