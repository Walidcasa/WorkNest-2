import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({ where: { userId, read: false } });
    return { count };
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
    return { ok: true };
  }

  async markOneRead(userId: string, id: string) {
    await this.prisma.notification.updateMany({ where: { id, userId }, data: { read: true } });
    return { ok: true };
  }

  async create(userId: string, title: string, body: string) {
    return this.prisma.notification.create({ data: { userId, title, body } });
  }

  // Auto-generate smart notifications based on user data
  async generateSmartNotifications(userId: string) {
    const existing = await this.prisma.notification.findMany({
      where: { userId, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      select: { title: true },
    });
    const existingTitles = new Set(existing.map(n => n.title));

    const [products, projects, employees] = await Promise.all([
      this.prisma.product.findMany({ where: { userId } }),
      this.prisma.project.findMany({ where: { userId } }),
      this.prisma.employee.findMany({ where: { userId } }),
    ]);

    const toCreate: { title: string; body: string }[] = [];

    // Low stock alerts
    const lowStock = products.filter(p => p.stock <= p.lowStockAt);
    if (lowStock.length > 0 && !existingTitles.has('Low Stock Alert')) {
      toCreate.push({
        title: 'Low Stock Alert',
        body: `${lowStock.length} product${lowStock.length > 1 ? 's are' : ' is'} running low: ${lowStock.slice(0, 2).map(p => p.name).join(', ')}`,
      });
    }

    // Delayed projects
    const delayed = projects.filter(p => p.deadline && new Date(p.deadline) < new Date() && p.status !== 'DONE');
    if (delayed.length > 0 && !existingTitles.has('Project Deadline Passed')) {
      toCreate.push({
        title: 'Project Deadline Passed',
        body: `${delayed.length} project${delayed.length > 1 ? 's have' : ' has'} passed their deadline. Review now.`,
      });
    }

    // Unpaid employees
    const unpaid = employees.filter(e => e.paymentStatus === 'PENDING');
    if (unpaid.length > 0 && !existingTitles.has('Pending Payroll')) {
      toCreate.push({
        title: 'Pending Payroll',
        body: `${unpaid.length} employee${unpaid.length > 1 ? 's have' : ' has'} pending salary payments.`,
      });
    }

    if (toCreate.length > 0) {
      await this.prisma.notification.createMany({
        data: toCreate.map(n => ({ ...n, userId })),
      });
    }

    return toCreate.length;
  }
}
