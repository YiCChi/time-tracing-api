import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field(() => GraphQLEmailAddress)
  email: string;

  @Field()
  password: string;

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  paidVacation: number;
}
