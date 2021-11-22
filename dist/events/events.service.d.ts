import { MongoRepository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventEntity } from './event.entity';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: MongoRepository<EventEntity>);
    create(createEventInput: CreateEventInput): Promise<EventEntity>;
    findAll(): Promise<EventEntity[]>;
    findOne(id: string): Promise<EventEntity>;
    update(id: string, updateEventInput: UpdateEventInput): Promise<number>;
    delete(id: string): Promise<number>;
}
