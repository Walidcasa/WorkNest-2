"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscriptionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const StripeLib = require("stripe");
let SubscriptionsService = SubscriptionsService_1 = class SubscriptionsService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(SubscriptionsService_1.name);
        const key = this.configService.get('STRIPE_SECRET_KEY') || 'sk_test_mock';
        const StripeConstructor = StripeLib.default || StripeLib;
        this.stripe = new StripeConstructor(key, { apiVersion: '2023-10-16' });
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
    async getSubscription(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { plan: true, trialEndsAt: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
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
    async createCheckoutSession(userId, priceId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!this.configService.get('STRIPE_SECRET_KEY')) {
            this.logger.warn('STRIPE_SECRET_KEY not found. Returning mock checkout URL.');
            return {
                url: `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard?checkout=success`,
            };
        }
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                customer_email: user.email,
                line_items: [{ price: priceId, quantity: 1 }],
                success_url: `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard?checkout=success`,
                cancel_url: `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/dashboard/billing?checkout=cancel`,
                metadata: { userId: user.id },
            });
            return { url: session.url };
        }
        catch (error) {
            this.logger.error('Failed to create checkout session', error);
            throw new Error('Failed to initiate checkout');
        }
    }
    async handleWebhook(signature, payload) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        if (!webhookSecret) {
            this.logger.warn('STRIPE_WEBHOOK_SECRET not configured.');
            return;
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        }
        catch (err) {
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
    async handleSubscriptionCreated(session) {
        const userId = session.metadata?.userId;
        if (!userId)
            return;
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
                stripeCustomerId: session.customer,
                stripePriceId: 'monthly_plan',
                plan: 'MONTHLY',
                status: 'ACTIVE',
                currentPeriodEnd,
            },
            update: {
                stripeCustomerId: session.customer,
                plan: 'MONTHLY',
                status: 'ACTIVE',
                currentPeriodEnd,
            },
        });
    }
    async handleSubscriptionDeleted(subscription) {
        const stripeCustomerId = subscription.customer;
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
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = SubscriptionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map