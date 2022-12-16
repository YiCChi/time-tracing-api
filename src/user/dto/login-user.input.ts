import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  userName: string;

  @Field()
  password: string;
}
