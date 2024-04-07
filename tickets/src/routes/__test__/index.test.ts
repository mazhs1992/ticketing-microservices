import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

jest.mock("../../nats-wrapper");

const createTicket = async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "awdrgrsce",
      price: 10,
    })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const responce = await request(app).get("/api/tickets").send().expect(200);

  expect(responce.body.length).toEqual(3);
});
