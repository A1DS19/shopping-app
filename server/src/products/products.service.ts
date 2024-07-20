import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { promises as fs } from 'fs';
import { join } from 'path';
import { TokenPayload } from 'src/auth/types/token.payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

import { PRODUCT_IMAGES_PATH } from './constants/product-images';
import { CreateProductRequestDto } from './dto/create-product-request.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: TokenPayload, body: CreateProductRequestDto) {
    return this.prismaService.product.create({
      data: {
        ...body,
        userId: user.userId,
      },
    });
  }

  async findAll(status?: string) {
    const args: Prisma.ProductFindManyArgs = {};
    if (status === 'available') {
      args.where = {
        sold: false,
      };
    }

    const products = await this.prismaService.product.findMany(args);
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(join(__dirname, '../../', `${PRODUCT_IMAGES_PATH}/${productId}.jpg`), fs.constants.F_OK);

      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(id: number) {
    try {
      return {
        ...(await this.prismaService.product.findFirstOrThrow({
          where: {
            id,
          },
        })),
        imageExists: await this.imageExists(id),
      };
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
