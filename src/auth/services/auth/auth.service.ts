import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../../users/services/user/user.service';
import { User } from '../../../users/entities/user.entity';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
