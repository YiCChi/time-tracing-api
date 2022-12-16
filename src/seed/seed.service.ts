import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { createUserSeeds } from './seeds/user.seeds';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
  private readonly _entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this._entityManager = entityManager;
  }

  async seed() {
    await Promise.all([this._entityManager.save(User, await createUserSeeds())]);
  }
}
