import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
}
