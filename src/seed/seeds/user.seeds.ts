import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

const SALT_OR_ROUNDS = 10;

async function createNewUser(
  id: number,
  userName: string,
  email: string,
  password: string,
  position: number,
  paidVacation: number
) {
  const user = new User();

  user.id = id;
  user.name = userName;
  user.email = email;
  user.password = await bcrypt.hash(password, SALT_OR_ROUNDS);
  user.position = position;
  user.paidVacation = paidVacation;

  return user;
}

export async function createUserSeeds() {
  return [
    await createNewUser(1, 'user1', 'user1@example.com', '123456', 0, 0),
    await createNewUser(2, 'user2', 'user2@example.com', '123456', 1, 5),
    await createNewUser(3, 'user3', 'user3@example.com', '123456', 2, 10),
    await createNewUser(4, 'user4', 'user4@example.com', '123456', 3, 15),
    await createNewUser(5, 'user5', 'user5@example.com', '123456', 4, 20),
  ];
}
