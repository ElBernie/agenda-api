import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  startingDate: Date;

  @Field(() => Date, { nullable: false })
  endingDate: Date;
}
