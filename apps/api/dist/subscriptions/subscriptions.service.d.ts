import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class SubscriptionsService {
    private prisma;
    private configService;
    private stripe;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService);
    getPlans(): Promise<{
        id: string;
        name: string;
        price: number;
        currency: string;
        interval: string;
        features: string[];
    }[]>;
    getSubscription(userId: string): Promise<{
        plan: import(".prisma/client").$Enums.Plan;
        trialEndsAt: Date;
        isTrialActive: boolean;
        daysLeft: number;
    }>;
    createCheckoutSession(userId: string, priceId: string): Promise<{
        url: any;
    }>;
    handleWebhook(signature: string, payload: Buffer): Promise<void>;
    private handleSubscriptionCreated;
    private handleSubscriptionDeleted;
}
