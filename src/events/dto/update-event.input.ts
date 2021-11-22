import { CreateEventInput } from './create-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
}
