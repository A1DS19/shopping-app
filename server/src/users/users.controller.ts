import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserRequestDto } from './dto/create-user-request-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.usersService.create(createUserRequestDto);
  }
}
