import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class StripeService {
    private configService;
    private prisma;
    private stripe;
    private readonly logger;
    constructor(configService: ConfigService, prisma: PrismaService);
    createCheckoutSession(userId: string, priceId: string): Promise<{
        url: any;
    }>;
    handleWebhook(signature: string, payload: Buffer): Promise<void>;
    private handleSubscriptionCreated;
    private handleSubscriptionDeleted;
}
