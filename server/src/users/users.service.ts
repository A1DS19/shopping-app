import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserRequestDto } from './dto/create-user-request-dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(createUserRequestDto: CreateUserRequestDto) {
    try {
      return await this.prismaService.user.create({
        data: {
          email: createUserRequestDto.email.toLowerCase(),
          password: await bcrypt.hash(createUserRequestDto.password, 10),
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      this.logger.error(error);

      if (error.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists');
      }

      throw error;
    }
  }

  async findUniqueUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
