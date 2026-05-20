import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.product.create({
      data: { ...data, userId },
    });
  }

  async findOne(id: string, userId: string) {
    const product = await this.prisma.product.findFirst({ where: { id, userId } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.product.delete({ where: { id } });
  }
}
