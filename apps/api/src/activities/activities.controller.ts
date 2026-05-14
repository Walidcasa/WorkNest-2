import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  log(@Request() req: any, @Body() data: any) {
    return this.activitiesService.log(req.user.userId, data);
  }

  @Get('today')
  findToday(@Request() req: any) {
    return this.activitiesService.findToday(req.user.userId);
  }

  @Get('focus-score')
  getFocusScore(@Request() req: any) {
    return this.activitiesService.getFocusScore(req.user.userId);
  }

  @Get('breakdown')
  getBreakdown(@Request() req: any) {
    return this.activitiesService.getBreakdown(req.user.userId);
  }
}
