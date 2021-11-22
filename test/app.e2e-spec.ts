import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionManager } from 'typeorm';
import { EventsModule } from '../src/events/events.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  /**
   * Test lifecycle
   */
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: process.env.DATABASE_URL,
          keepConnectionAlive: true,
        }),
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
        }),
        AppModule,
        EventsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  // it('should get the events list', () => {
  //   return request(app.getHttpServer()).post('/graphql').send({
  //     operationName: 'events',
  //     varia
  //   });
  // });
});
