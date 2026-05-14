import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Injectable()
export class FinancesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createFinanceDto: CreateFinanceDto) {
    return this.prisma.finance.create({
      data: {
        ...createFinanceDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.finance.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const finance = await this.prisma.finance.findFirst({
      where: { id, userId },
    });
    if (!finance) throw new NotFoundException('Transaction not found');
    return finance;
  }

  async update(id: string, userId: string, updateFinanceDto: UpdateFinanceDto) {
    await this.findOne(id, userId);
    return this.prisma.finance.update({
      where: { id },
      data: updateFinanceDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.finance.delete({
      where: { id },
    });
  }

  async getSummary(userId: string) {
    const finances = await this.findAll(userId);
    const totalRevenue = finances
      .filter((f) => f.type === 'REVENUE')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = finances
      .filter((f) => f.type === 'EXPENSE')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
    };
  }
}
