import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    return this.adminService.getGlobalStats();
  }

  @Get('users')
  async getUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: { role?: string; plan?: string; suspended?: boolean }) {
    return this.adminService.updateUser(id, body);
  }
}
