import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
export declare class EventsResolver {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    createEvent(createEventInput: CreateEventInput): Promise<import("./event.entity").EventEntity>;
    findAll(): Promise<import("./event.entity").EventEntity[]>;
    findOne(id: string): Promise<import("./event.entity").EventEntity>;
    updateEvent(updateEventInput: UpdateEventInput): Promise<number>;
    removeEvent(id: string): Promise<number>;
}
