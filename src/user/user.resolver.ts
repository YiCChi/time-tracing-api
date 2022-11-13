import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  private readonly _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createAuthorInput: CreateUserInput) {
    return this._userService.create(createAuthorInput);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async findAll() {
    return this._userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this._userService.findOne(id);
  }

  @Mutation(() => String)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this._userService.update(updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => ID }) id: number) {
    return this._userService.remove(id);
  }
}
