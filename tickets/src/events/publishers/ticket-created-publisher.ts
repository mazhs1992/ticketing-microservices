import {Publisher, Subjects, TicketCreatedEvent} from '@vm92tickets/common';



export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

