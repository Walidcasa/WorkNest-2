import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getGlobalStats() {
    const totalUsers = await this.prisma.user.count();
    const premiumUsers = await this.prisma.user.count({
      where: { plan: { in: ['MONTHLY', 'YEARLY'] } }
    });
    
    const transactions = await this.prisma.transaction.findMany();
    const totalRevenue = transactions
      .filter(t => t.type === 'REVENUE')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const usersByCountry = await this.prisma.user.groupBy({
      by: ['countryCode'],
      _count: true,
    });

    return {
      totalUsers,
      premiumUsers,
      totalRevenue,
      conversionRate: totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0,
      usersByCountry
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateUser(targetId: string, data: { role?: string; plan?: string; suspended?: boolean }) {
    const updateData: any = {};
    if (data.role) updateData.role = data.role;
    if (data.plan) updateData.plan = data.plan;
    if (data.suspended !== undefined) updateData.emailVerified = !data.suspended;
    return this.prisma.user.update({
      where: { id: targetId },
      data: updateData,
      select: { id: true, email: true, name: true, role: true, plan: true, emailVerified: true },
    });
  }
}
