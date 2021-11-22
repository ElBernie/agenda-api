import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Event {
  @Field(() => ID)
  id: string;

  @Field(() => String, { name: 'name', nullable: false })
  name: string;

  @Field(() => GraphQLISODateTime, { nullable: false })
  startingDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: false })
  endingDate: Date;
}
