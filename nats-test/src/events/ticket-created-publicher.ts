import { Publisher } from "./base-publicer";
import { TicketCreatedEvent } from "./ticket-created-even";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
