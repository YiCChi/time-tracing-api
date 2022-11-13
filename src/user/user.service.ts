import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly _repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this._repo = repo;
  }

  create(createUserDto: CreateUserDto) {
    return `This action adds a new user: ${createUserDto.name}`;
  }

  async findAccount(account: string) {
    const users = await this._repo.findOne({ where: { account: account } });

    return users;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user: ${updateUserDto.name ?? ''}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(account: string, password: string) {
    const user = await this.findAccount(account);

    if (!user) {
      throw new NotFoundException('wrong account');
    }

    if (user.password !== password) {
      throw new BadRequestException('wrong password');
    }

    return user;
  }
}
