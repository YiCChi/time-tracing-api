import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}
