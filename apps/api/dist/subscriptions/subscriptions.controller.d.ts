import { RawBodyRequest } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getPlans(): Promise<{
        id: string;
        name: string;
        price: number;
        currency: string;
        interval: string;
        features: string[];
    }[]>;
    getStatus(req: any): Promise<{
        plan: import(".prisma/client").$Enums.Plan;
        trialEndsAt: Date;
        isTrialActive: boolean;
        daysLeft: number;
    }>;
    createCheckout(req: any, priceId: string): Promise<{
        url: any;
    }>;
    webhook(signature: string, req: RawBodyRequest<Request>): Promise<void>;
}
