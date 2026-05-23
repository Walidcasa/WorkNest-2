import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async getMyTickets(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { name: true } } },
        },
      },
    });
  }

  async getAllTickets() {
    return this.prisma.supportTicket.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { name: true } } },
        },
      },
    });
  }

  async updateTicketStatus(ticketId: string, status: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: status as any },
    });
  }

  async sendMessage(ticketId: string, senderId: string, message: string, isAdmin: boolean) {
    if (!isAdmin) {
      const ticket = await this.prisma.supportTicket.findUnique({ where: { id: ticketId } });
      if (!ticket || ticket.userId !== senderId) throw new ForbiddenException();
    }
    const msg = await this.prisma.ticketMessage.create({
      data: { ticketId, senderId, message, isAdmin },
      include: { sender: { select: { name: true } } },
    });
    await this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });
    return msg;
  }
}
