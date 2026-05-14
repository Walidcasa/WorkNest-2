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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SubscriptionGuard = class SubscriptionGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.id || request.user?.userId;
        if (!userId)
            return false;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { plan: true, trialEndsAt: true },
        });
        if (!user)
            return false;
        if (user.plan === 'EXPIRED') {
            throw new common_1.ForbiddenException('Your subscription has expired. Please upgrade to continue.');
        }
        if (user.plan === 'FREE_TRIAL') {
            const now = new Date();
            if (user.trialEndsAt && user.trialEndsAt < now) {
                await this.prisma.user.update({
                    where: { id: userId },
                    data: { plan: 'EXPIRED' },
                });
                throw new common_1.ForbiddenException('Your free trial has expired. Please upgrade to continue.');
            }
        }
        return true;
    }
};
exports.SubscriptionGuard = SubscriptionGuard;
exports.SubscriptionGuard = SubscriptionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionGuard);
//# sourceMappingURL=subscription.guard.js.map