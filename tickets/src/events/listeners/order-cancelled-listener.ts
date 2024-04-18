import { Listener,OrderCancelledEvent,Subjects } from "@vm92tickets/common";
import { Ticket } from "../../models/ticket";

import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledEventListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled =Subjects.OrderCancelled;
    queueGroupName=queueGroupName
    async onMessage(data: { id: string; version: number; ticket: { id: string; }; }, msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)

        if(!ticket){
            throw new Error("ticket not found");            
        }

        ticket.set({orderId:undefined})

        await ticket.save()

        await new TicketUpdatedPublisher(this.client).publish({
            id:ticket.id,
            orderId:ticket.orderId,
            userId:ticket.userId,
            price:ticket.price,
            title:ticket.title,
            version:ticket.version
        })
    }
}