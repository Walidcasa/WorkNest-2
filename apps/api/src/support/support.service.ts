import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async createTicket(userId: string, data: { subject: string; description: string; severity: string }) {
    return this.prisma.supportTicket.create({
      data: {
        userId,
        subject: data.subject,
        description: data.description,
        severity: data.severity as any,
      },
      include: { user: { select: { name: true, email: true } } },
    });
  }

  async getAllTickets() {
    return this.prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    });
  }

  async updateTicketStatus(ticketId: string, status: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: status as any },
    });
  }
}
