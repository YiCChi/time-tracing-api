import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './dto/auth-payload.output';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Public } from 'src/common/decorator/public.decorator';

@Resolver(() => User)
export class UserResolver {
  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  @Public()
  @Mutation(() => AuthPayload)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this._userService.login(loginUserInput);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this._userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async findAll() {
    return this._userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this._userService.findOneById(id);
  }

  @Mutation(() => String)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this._userService.update(updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this._userService.remove(id);
  }
}
