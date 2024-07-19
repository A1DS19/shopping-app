import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/types/token.payload.interface';

import { PRODUCT_IMAGES_PATH } from './constants/product-images';
import { CreateProductRequestDto } from './dto/create-product-request.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: TokenPayload, @Body() body: CreateProductRequestDto) {
    return await this.productsService.create(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    return await this.productsService.findOne(+productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: PRODUCT_IMAGES_PATH,
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const allowedExtensions = ['.jpg'];
          const filename = `${req.params.productId}${fileExtName}`;
          if (!allowedExtensions.includes(fileExtName.toLowerCase())) {
            return cb(new UnsupportedMediaTypeException('Invalid file type'), filename);
          }
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 500000 }), new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    ) // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _file: Express.Multer.File,
  ) {}
}
