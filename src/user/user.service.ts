import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import type { CreateUserInput } from './dto/create-user.input';
import type { LoginUserInput } from './dto/login-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  private readonly _repo: Repository<User>;

  private readonly _authService: AuthService;

  constructor(
    @InjectRepository(User) repo: Repository<User>,
    @Inject(forwardRef(() => AuthService)) authService: AuthService
  ) {
    this._repo = repo;
    this._authService = authService;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this._authService.validateUser(loginUserInput.userName, loginUserInput.password);

    if (!user) {
      throw new BadRequestException('invalid username or password');
    } else {
      return this._authService.generateCredentials(user);
    }
  }

  async create(createUserInput: CreateUserInput) {
    const user = new User();

    const saltOrRounds = 10;

    createUserInput.password = await bcrypt.hash(createUserInput.password, saltOrRounds);

    Object.keys(createUserInput).forEach((k) => {
      const key = k as keyof CreateUserInput;

      user.createEntity(key, createUserInput[key]);
    });

    return this._repo.save(user);
  }

  async findAll() {
    return this._repo.find();
  }

  async findOneById(id: number) {
    return this._repo.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return this._repo.findOneBy({ name });
  }

  async update(updateUserInput: UpdateUserInput) {
    const user = await this.findOneById(updateUserInput.id);

    if (!user) throw new NotFoundException();

    console.log(Object.getPrototypeOf(updateUserInput));

    Object.keys(updateUserInput).forEach((k) => {
      const key = k as keyof UpdateUserInput;

      user.updateEntity(key, updateUserInput[key]);
    });

    await this._repo.save(user);

    return 'update succeed';
  }

  async remove(id: number) {
    await this._repo.delete(id);

    return 'delete succeed';
  }
}
