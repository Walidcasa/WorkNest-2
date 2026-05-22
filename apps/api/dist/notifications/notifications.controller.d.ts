import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        body: string;
        read: boolean;
    }[]>;
    getUnreadCount(req: any): Promise<{
        count: number;
    }>;
    generate(req: any): Promise<number>;
    markAllRead(req: any): Promise<{
        ok: boolean;
    }>;
    markOneRead(req: any, id: string): Promise<{
        ok: boolean;
    }>;
}
