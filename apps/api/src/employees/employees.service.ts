import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.employee.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.employee.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id, userId },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.employee.delete({
      where: { id },
    });
  }

  async getPayrollSummary(userId: string) {
    const employees = await this.findAll(userId);
    const totalMonthly = employees.reduce((acc, curr) => acc + curr.salary, 0);
    const pendingPayments = employees.filter(e => e.paymentStatus === 'PENDING').length;

    return {
      totalMonthly,
      pendingPayments,
      employeeCount: employees.length,
    };
  }
}
