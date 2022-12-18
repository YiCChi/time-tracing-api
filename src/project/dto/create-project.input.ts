import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => Int)
  startTime: number;

  @Field(() => Int)
  endTime: number;
}
