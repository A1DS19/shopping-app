import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'src/auth/types/token.payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductRequestDto } from './dto/create-product-request.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(user: TokenPayload, body: CreateProductRequestDto) {
    return this.prismaService.product.create({
      data: {
        ...body,
        userId: user.userId,
      },
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
