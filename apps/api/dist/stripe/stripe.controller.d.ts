import { RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckout(req: any, priceId: string): Promise<{
        url: any;
    }>;
    webhook(signature: string, req: RawBodyRequest<Request>): Promise<void>;
}
