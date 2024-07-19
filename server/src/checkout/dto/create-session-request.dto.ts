import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateSessionRequestDto {
  @IsNumber()
  @Type(() => Number)
  productId: number;
}
