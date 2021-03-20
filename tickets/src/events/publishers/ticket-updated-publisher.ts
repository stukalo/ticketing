import {Publisher, TicketUpdatedEvent, Subjects} from "@savtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

    publish(data: TicketUpdatedEvent['data']): Promise<void> {
        return super.publish(data);
    }
}