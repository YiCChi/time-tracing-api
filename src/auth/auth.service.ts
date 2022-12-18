import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import type { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly _userService: UserService;

  private readonly _jwtService: JwtService;

  constructor(@Inject(forwardRef(() => UserService)) userService: UserService, jwtService: JwtService) {
    this._userService = userService;
    this._jwtService = jwtService;
  }

  async validateUser(userName: string, password: string) {
    const user = await this._userService.findOneByName(userName);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  // TODO: nameとidだけでいいのか検討する
  generateCredentials(user: User) {
    const payload = { userName: user.name, sub: user.id };

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      access_token: this._jwtService.sign(payload),
    };
  }
}
