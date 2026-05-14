import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('insights')
  async getInsights(@Request() req) {
    // This calls the generateInsight method in the service
    return this.aiService.generateInsight(req.user.id);
  }
}
