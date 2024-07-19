import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CheckoutService } from './checkout.service';
import { CreateSessionRequestDto } from './dto/create-session-request.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post('session')
  async createCheckoutSession(@Body() body: CreateSessionRequestDto) {
    return this.checkoutService.createCheckoutSession(body.productId);
  }
}
