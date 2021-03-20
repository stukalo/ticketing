import {Publisher, TicketCreatedEvent, Subjects} from "@savtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;

    publish(data: TicketCreatedEvent['data']): Promise<void> {
        return super.publish(data);
    }
}