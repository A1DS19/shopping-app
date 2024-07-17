import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(user, res);
  }
}
