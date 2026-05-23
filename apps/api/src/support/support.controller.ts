import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTicket(@Request() req: any, @Body() body: { subject: string; description: string; severity: string }) {
    return this.supportService.createTicket(req.user.userId, body);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyTickets(@Request() req: any) {
    return this.supportService.getMyTickets(req.user.userId);
  }

  @Post(':id/reply')
  @UseGuards(JwtAuthGuard)
  async userReply(@Request() req: any, @Param('id') id: string, @Body() body: { message: string }) {
    return this.supportService.sendMessage(id, req.user.userId, body.message, false);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  async getAllTickets() {
    return this.supportService.getAllTickets();
  }

  @Patch('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.supportService.updateTicketStatus(id, body.status);
  }

  @Post('admin/:id/reply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  async adminReply(@Request() req: any, @Param('id') id: string, @Body() body: { message: string }) {
    return this.supportService.sendMessage(id, req.user.userId, body.message, true);
  }
}
