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
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
