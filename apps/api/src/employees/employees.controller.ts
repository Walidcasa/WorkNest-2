import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.employeesService.findAll(req.user.userId);
  }

  @Get('payroll')
  getPayroll(@Request() req: any) {
    return this.employeesService.getPayrollSummary(req.user.userId);
  }

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.employeesService.create(req.user.userId, data);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.employeesService.update(id, req.user.userId, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.employeesService.remove(id, req.user.userId);
  }
}
