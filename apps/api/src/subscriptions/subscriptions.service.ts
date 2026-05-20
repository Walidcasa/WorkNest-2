import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionsService {
  private stripe: any;
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const key = this.configService.get<string>('STRIPE_SECRET_KEY') || 'sk_test_mock';
    this.stripe = new (Stripe as any)(key, { apiVersion: '2023-10-16' });
  }

  async getPlans() {
    return [
      {
        id: 'monthly',
        name: 'Professional Monthly',
        price: 15,
        currency: 'USD',
        interval: 'month',
        features: ['AI Advisor', 'Unlimited Projects', 'Staff Management', 'Financial Analytics'],
      },
      {
        id: 'yearly',
        name: 'Professional Yearly',
        price: 110,
        currency: 'USD',
        interval: 'year',
        features: ['Everything in Monthly', '2 Months Free', 'Priority Support', 'Early Access Features'],
      },
    ];
  }

  async getSubscription(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, trialEndsAt: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const now = new Date();
    const isTrialActive = user.plan === 'FREE_TRIAL' && user.trialEndsAt && user.trialEndsAt > now;

    return {
      plan: user.plan,
      trialEndsAt: user.trialEndsAt,
      isTrialActive,
      daysLeft: user.trialEndsAt
        ? Math.ceil((user.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0,
    };
  }

  async createCheckoutSession(userId: string, priceId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (!this.configService.get<string>('STRIPE_SECRET_KEY')) {
      this.logger.warn('STRIPE_SECRET_KEY not found. Returning mock checkout URL.');
      return {
        url: `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}/dashboard?checkout=success`,
      };
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer_email: user.email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}/dashboard?checkout=success`,
        cancel_url: `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}/dashboard/billing?checkout=cancel`,
        metadata: { userId: user.id },
      });
      return { url: session.url };
    } catch (error) {
      this.logger.error('Failed to create checkout session', error);
      throw new Error('Failed to initiate checkout');
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      this.logger.warn('STRIPE_WEBHOOK_SECRET not configured.');
      return;
    }

    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new Error('Webhook error');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object);
        break;
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleSubscriptionCreated(session: any) {
    const userId = session.metadata?.userId;
    if (!userId) return;

    await this.prisma.user.update({
      where: { id: userId },
      data: { plan: 'MONTHLY' },
    });

    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

    await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        stripeCustomerId: session.customer as string,
        stripePriceId: 'monthly_plan',
        plan: 'MONTHLY',
        status: 'ACTIVE',
        currentPeriodEnd,
      },
      update: {
        stripeCustomerId: session.customer as string,
        plan: 'MONTHLY',
        status: 'ACTIVE',
        currentPeriodEnd,
      },
    });
  }

  private async handleSubscriptionDeleted(subscription: any) {
    const stripeCustomerId = subscription.customer as string;
    const sub = await this.prisma.subscription.findFirst({ where: { stripeCustomerId } });

    if (sub) {
      await this.prisma.user.update({
        where: { id: sub.userId },
        data: { plan: 'EXPIRED' },
      });
      await this.prisma.subscription.update({
        where: { userId: sub.userId },
        data: { status: 'CANCELLED' },
      });
    }
  }
}
