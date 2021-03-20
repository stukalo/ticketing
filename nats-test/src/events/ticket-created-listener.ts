import {Message} from "node-nats-streaming";
import {Listener} from './base-listener';
import {Subjects} from "./subjects";
import {TicketCreatedEvent} from "./ticket-create-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    readonly queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event parsedData: ', data);
        msg.ack();
    }
}