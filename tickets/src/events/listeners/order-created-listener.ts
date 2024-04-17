import { Listener, OrderCreatedEvent, Subjects } from "@vm92tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    
  }
}
