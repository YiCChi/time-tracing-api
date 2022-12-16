import { Field, InputType } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field()
  userName: string;

  @Field(() => GraphQLEmailAddress)
  email: string;

  @Field()
  password: string;
}
