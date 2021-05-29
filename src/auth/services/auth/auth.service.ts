import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../../users/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if(matched) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }

    return null;
  }
}
