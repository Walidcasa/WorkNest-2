import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    this.$connect().catch(e => console.error('DB connect warning:', e.message));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
