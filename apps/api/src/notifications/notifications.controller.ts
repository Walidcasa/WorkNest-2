import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getAll(@Request() req: any) {
    return this.notificationsService.getAll(req.user.userId);
  }

  @Get('unread-count')
  getUnreadCount(@Request() req: any) {
    return this.notificationsService.getUnreadCount(req.user.userId);
  }

  @Get('generate')
  generate(@Request() req: any) {
    return this.notificationsService.generateSmartNotifications(req.user.userId);
  }

  @Patch('read-all')
  markAllRead(@Request() req: any) {
    return this.notificationsService.markAllRead(req.user.userId);
  }

  @Patch(':id/read')
  markOneRead(@Request() req: any, @Param('id') id: string) {
    return this.notificationsService.markOneRead(req.user.userId, id);
  }
}
