import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { CreateProjectInput } from '../dto/create-project.input';
import type { UpdateProjectInput } from '../dto/update-project.input';

@Entity()
@ObjectType()
export class Project extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field(() => Int)
  startTime: number;

  @Column()
  @Field(() => Int)
  endTime: number;

  createEntity<Key extends keyof CreateProjectInput>(key: Key, value: CreateProjectInput[Key]) {
    (this[key] as unknown) = value;
  }

  updateEntity<Key extends keyof UpdateProjectInput>(key: Key, value: UpdateProjectInput[Key]) {
    if (value !== undefined) (this[key] as unknown) = value;
  }
}
