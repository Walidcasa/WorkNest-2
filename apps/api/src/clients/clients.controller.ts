import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.clientsService.findAll(req.user.userId);
  }

  @Get('summary')
  getSummary(@Request() req: any) {
    return this.clientsService.getSummary(req.user.userId);
  }

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.clientsService.create(req.user.userId, data);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.clientsService.update(id, req.user.userId, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.clientsService.remove(id, req.user.userId);
  }
}
