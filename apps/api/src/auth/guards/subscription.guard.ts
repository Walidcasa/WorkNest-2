import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || request.user?.userId;

    if (!userId) return false;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true, trialEndsAt: true },
    });

    if (!user) return false;

    if (user.plan === 'EXPIRED') {
      throw new ForbiddenException('Your subscription has expired. Please upgrade to continue.');
    }

    if (user.plan === 'FREE_TRIAL') {
      const now = new Date();
      if (user.trialEndsAt && user.trialEndsAt < now) {
        // Automatically mark as expired if trial date is past
        await this.prisma.user.update({
          where: { id: userId },
          data: { plan: 'EXPIRED' },
        });
        throw new ForbiddenException('Your free trial has expired. Please upgrade to continue.');
      }
    }

    return true;
  }
}
