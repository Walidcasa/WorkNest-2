import { Controller, Get, Post, Body, UseGuards, Request, Headers, RawBodyRequest } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Request() req: any) {
    return this.subscriptionsService.getSubscription(req.user.id || req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  createCheckout(@Request() req: any, @Body('priceId') priceId: string) {
    return this.subscriptionsService.createCheckoutSession(req.user.id || req.user.userId, priceId);
  }

  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Request() req: RawBodyRequest<Request>,
  ) {
    const payload = (req as any).rawBody;
    return this.subscriptionsService.handleWebhook(signature, payload);
  }
}
