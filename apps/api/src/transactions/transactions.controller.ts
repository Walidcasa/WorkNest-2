import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.transactionsService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: any, @Query() query: any) {
    return this.transactionsService.findAll(req.user.userId, query);
  }

  @Get('summary')
  getSummary(@Request() req: any) {
    return this.transactionsService.getSummary(req.user.userId);
  }
}
