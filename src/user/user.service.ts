import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly _repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this._repo = repo;
  }

  async create(createUserInput: CreateUserInput) {
    const user = new User();

    user.age = createUserInput.age;
    user.isActive = createUserInput.isActive;
    user.name = createUserInput.name;

    return this._repo.save(user);
  }

  async findAll() {
    return this._repo.find();
  }

  async findOne(id: number) {
    return this._repo.findOneBy({ id });
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, name } = updateUserInput;

    await this._repo.update({ id }, { name });

    return 'update succeed';
  }

  async remove(id: number) {
    await this._repo.delete(id);

    return 'delete succeed';
  }
}
