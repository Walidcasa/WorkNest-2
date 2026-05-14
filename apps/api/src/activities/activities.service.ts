import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async log(userId: string, data: any) {
    return this.prisma.activity.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findToday(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.activity.findMany({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFocusScore(userId: string) {
    const activities = await this.findToday(userId);
    if (activities.length === 0) return 0;

    const totalMinutes = activities.reduce((acc, curr) => acc + curr.duration, 0);
    const productiveMinutes = activities
      .filter((a) => a.level === 'PRODUCTIVE')
      .reduce((acc, curr) => acc + curr.duration, 0);

    return Math.round((productiveMinutes / totalMinutes) * 100);
  }

  async getBreakdown(userId: string) {
    const activities = await this.findToday(userId);
    
    const breakdown = {
      PRODUCTIVE: 0,
      NEUTRAL: 0,
      WASTE: 0,
    };

    activities.forEach((a) => {
      breakdown[a.level] += a.duration;
    });

    return breakdown;
  }
}
