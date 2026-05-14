import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.client.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.client.findMany({
      where: { userId },
      include: { projects: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, userId },
      include: { projects: true },
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.client.delete({
      where: { id },
    });
  }

  async getSummary(userId: string) {
    const clients = await this.findAll(userId);
    const totalPaid = clients.reduce((acc, curr) => acc + curr.totalPaid, 0);
    const totalPending = clients.reduce((acc, curr) => acc + curr.remainingBalance, 0);

    return {
      totalClients: clients.length,
      totalPaid,
      totalPending,
    };
  }
}
