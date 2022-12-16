import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;

  /**
   * only executed when using repo.save
   */
  @BeforeInsert()
  setTimestamp() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * only executed when using repo.save
   */
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
