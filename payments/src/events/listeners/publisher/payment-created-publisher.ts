import { Subjects,Publisher,PaymentCreatedEvent } from "@vm92tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated= Subjects.PaymentCreated
}