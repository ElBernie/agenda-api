import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventEntity } from './event.entity';
import Event from './event.model';
import { v4 as uuid } from 'uuid';
import * as firebase from 'firebase-admin';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: MongoRepository<EventEntity>,
  ) {}
  create(createEventInput: CreateEventInput): Promise<EventEntity> {
    const event = this.eventRepository.create({
      ...createEventInput,
      id: uuid(),
      startingDate: createEventInput.startingDate,
    });
    firebase.messaging().sendToTopic('agenda', {
      notification: {
        title: 'Nouvel évènement',
        body: createEventInput.name,
      },
      data: {
        event: createEventInput.name,
        startingDate: createEventInput.startingDate.toISOString(),
      },
    });
    console.log(createEventInput.startingDate.toISOString());
    return this.eventRepository.save(event);
  }

  findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({
      where: {
        startingDate: {
          $gte: new Date(Date.now()),
        },
      },
      order: {
        startingDate: 'ASC',
      },
    });
  }

  findOne(id: string): Promise<EventEntity> {
    return this.eventRepository.findOne({ id });
  }

  async update(
    id: string,
    updateEventInput: UpdateEventInput,
  ): Promise<number> {
    const update = await this.eventRepository.updateOne(
      { id: id },
      {
        $set: {
          name: updateEventInput.name,
        },
      },
    );
    return update.result.nModified;
  }

  async delete(id: string): Promise<number> {
    const deleteEvent = await this.eventRepository.deleteOne({ id: id });
    return deleteEvent.deletedCount;
  }
}
