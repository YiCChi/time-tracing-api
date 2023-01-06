import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

const SALT_OR_ROUNDS = 10;

async function createNewUser(id: number, userName: string, email: string, password: string) {
  const user = new User();

  user.id = id;
  user.userName = userName;
  user.email = email;
  user.password = await bcrypt.hash(password, SALT_OR_ROUNDS);

  return user;
}

export async function createUserSeeds() {
  return [
    await createNewUser(1, 'user1', 'user1@example.com', '123456'),
    await createNewUser(2, 'user2', 'user2@example.com', '123456'),
    await createNewUser(3, 'user3', 'user3@example.com', '123456'),
    await createNewUser(4, 'user4', 'user4@example.com', '123456'),
    await createNewUser(5, 'user5', 'user5@example.com', '123456'),
  ];
}