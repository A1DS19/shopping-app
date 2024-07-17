import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import ms from 'ms';
import { UsersService } from 'src/users/users.service';

import { TokenPayload } from './types/token.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const user = await this.usersService.findUniqueUser({ email: username.toLowerCase() });
      const authenticated = await bcrypt.compare(pass, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User, res: Response) {
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + ms(this.configService.get<string>('JWT_EXPIRES_IN_HOURS')));

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const token = this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'none',
    });

    return { token };
  }
}
