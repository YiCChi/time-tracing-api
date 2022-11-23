import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { CreateUserInput } from '../dto/create-user.input';
import type { UpdateUserInput } from '../dto/update-user.input';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Column()
  @Field()
  userName: string;

  @Column()
  @Field(() => GraphQLEmailAddress)
  email: string;

  @Column()
  @Field()
  password: string;

  createEntity<Key extends keyof CreateUserInput>(key: Key, value: CreateUserInput[Key]) {
    this[key] = value;
  }

  updateEntity<Key extends keyof UpdateUserInput>(key: Key, value: UpdateUserInput[Key]) {
    if (value !== undefined) (this[key] as unknown) = value;
  }
}
