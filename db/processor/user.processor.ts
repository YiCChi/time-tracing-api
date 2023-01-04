import * as bcrypt from 'bcrypt';
import type { IProcessor } from 'typeorm-fixtures-cli';
import type { User } from '../../src/user/entities/user.entity';

export default class UserProcessor implements IProcessor<User> {
  async preProcess(_: string, user: User) {
    const newPassword = await bcrypt.hash(user.password, 10);

    return { ...user, password: newPassword };
  }
}
