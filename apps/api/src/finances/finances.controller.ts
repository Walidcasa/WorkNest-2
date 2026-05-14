import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('finances')
@UseGuards(JwtAuthGuard)
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  create(@Request() req, @Body() createFinanceDto: CreateFinanceDto) {
    return this.financesService.create(req.user.id, createFinanceDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.financesService.findAll(req.user.id);
  }

  @Get('summary')
  getSummary(@Request() req) {
    return this.financesService.getSummary(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.financesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financesService.update(id, req.user.id, updateFinanceDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.financesService.remove(id, req.user.id);
  }
}
