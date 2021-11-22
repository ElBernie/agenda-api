import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UpdateEventInput } from '../dto/update-event.input';
import { EventEntity } from '../event.entity';
import { EventsService } from '../events.service';
import { eventStubs } from './stubs/event.stubs';

const mockEventsRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
});
describe('EventsService', () => {
  let service: EventsService;
  let eventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(EventEntity),
          useFactory: mockEventsRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);

    eventsRepository = module.get(getRepositoryToken(EventEntity));
  });

  describe('Get Events', () => {
    it('calls EventsRepository.getEvents and returns the result', async () => {
      eventsRepository.find.mockResolvedValue('salut les nazes');
      const result = await service.findAll();
      expect(result).toBe('salut les nazes');
    });
  });

  describe('Get an event by ID', () => {
    it('call EventsRepository.findOne and returns the result', async () => {
      eventsRepository.findOne.mockResolvedValue(eventStubs());
      const result = await service.findOne(eventStubs().id);
      expect(result).toEqual(eventStubs());
    });

    it('call EventsRepository.findOne and returns an error ', async () => {
      eventsRepository.findOne.mockResolvedValue(null);
      expect(service.findOne('non-existing-id')).resolves.toBeNull();
    });
  });

  describe('Create an event', () => {
    it('should create an event, with a valid event object', () => {
      eventsRepository.save.mockResolvedValue({
        id: eventStubs().id,
        name: eventStubs().name,
        startingDate: eventStubs().startingDate,
        endingDate: eventStubs().endingDate,
      });
      expect(
        service.create({
          name: eventStubs().name,
          startingDate: eventStubs().startingDate,
          endingDate: eventStubs().endingDate,
        }),
      ).resolves.toEqual({
        id: expect.any(String),
        name: eventStubs().name,
        startingDate: eventStubs().startingDate,
        endingDate: eventStubs().endingDate,
      });
    });
  });

  describe('Update an event', () => {
    it('should update an event with a valid event object', () => {
      const updateEvent: UpdateEventInput = {
        id: eventStubs().id,
        name: 'new name',
      };
      eventsRepository.updateOne.mockResolvedValue({
        result: {
          nModified: 1,
        },
      });
      expect(service.update(eventStubs().id, updateEvent)).resolves.toEqual(1);
    });
  });

  describe('Remove an event', () => {
    it('should remove an event with a valid event id', () => {
      eventsRepository.deleteOne.mockResolvedValue({ deletedCount: 1 });
      expect(service.delete(eventStubs().id)).resolves.toEqual(1);
    });
  });
});
