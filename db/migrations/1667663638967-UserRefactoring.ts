import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1667663638967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userName" TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "user" TO "userName"`);
  }
}
