import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventInput } from '../dto/create-event.input';
import { EventsResolver } from '../events.resolver';
import { EventsService } from '../events.service';
import Event from '../event.model';
import { v4 as uuid } from 'uuid';
import { eventStubs } from './stubs/event.stubs';
import { UpdateEvent } from 'typeorm';
import { UpdateEventInput } from '../dto/update-event.input';

describe('EventsResolver', () => {
  let resolver: EventsResolver;

  const mockEventsService = {
    create: jest.fn((dto) => eventStubs()),
    findAll: jest.fn(() => {
      return [eventStubs()];
    }),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsResolver, EventsService],
    })
      .overrideProvider(EventsService)
      .useValue(mockEventsService)
      .compile();

    resolver = module.get<EventsResolver>(EventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createEvent', () => {
    it('should create an event', () => {
      expect(resolver.createEvent(eventStubs())).toEqual<Event>(eventStubs());
      expect(mockEventsService.create).toBeCalledWith(eventStubs());
    });
  });

  describe('findAll', () => {
    it('should get all the events', () => {
      expect(resolver.findAll()).toEqual<Event[]>([eventStubs()]);
    });
  });

  describe('findOne', () => {
    it('should get an event with a valid ID', async () => {
      mockEventsService.findOne.mockResolvedValue(eventStubs());
      expect(resolver.findOne(eventStubs().id)).resolves.toEqual(eventStubs());
    });

    it('should throw an error if id is not existing', async () => {
      mockEventsService.findOne.mockResolvedValue(null);
      expect(resolver.findOne('unknown-id')).resolves.toBeNull();
    });
  });

  describe('update', () => {
    it('should update an event with a valid ID', () => {
      const dto: UpdateEventInput = {
        id: eventStubs().id,
        name: 'new name',
      };
      mockEventsService.update.mockResolvedValue({
        id: eventStubs().id,
        name: 'new name',
      });
      expect(resolver.updateEvent(dto)).resolves.toEqual({
        id: eventStubs().id,
        name: 'new name',
      });
    });

    it('should return null event if id is invalid', () => {
      const dto: UpdateEventInput = {
        id: 'unvalid-id',
        name: 'new name',
      };
      mockEventsService.update.mockRejectedValue(null);
      expect(resolver.updateEvent(dto)).rejects.toBeNull();
    });
  });

  describe('delete event', () => {
    it('should remove an event', () => {
      mockEventsService.delete.mockResolvedValue(1);
      expect(resolver.removeEvent(eventStubs().id)).resolves.toEqual(1);
    });
  });
});
