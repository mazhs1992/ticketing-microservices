import { OrderCancelledEventListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../__mocks__/nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { OrderCreatedEvent, OrderStatus } from "@vm92tickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCancelledEvent } from "@vm92tickets/common";
const setup = async () => {
  //Create an instance of the listener
  //@ts-ignore
  const listener = new OrderCancelledEventListener(natsWrapper.client);

 const orderId =   new mongoose.Types.ObjectId().toHexString()

  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asds",
  });
  ticket.set({orderId})

  await ticket.save();

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  const data :OrderCancelledEvent['data']={
    id:orderId,
    version:0,
    ticket:{
      id:ticket.id
    }
  }

  //@ts-ignore
  const msg:Message={
    ack:jest.fn()
  }
  return { listener, ticket, data, msg,orderId };
};

it("update ticket,publish event.acke the message", async () => {
 
  const { listener, ticket, data, msg,orderId } = await setup()
  await listener.onMessage(data,msg)

  const updatedTicket = await Ticket.findById(ticket.id)
  expect(updatedTicket!.orderId).not.toBeDefined()
  expect(msg.ack).toHaveBeenCalled()
  expect(natsWrapper.client.publish).toHaveBeenCalled()

});

