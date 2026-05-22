import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        body: string;
        read: boolean;
    }[]>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    markAllRead(userId: string): Promise<{
        ok: boolean;
    }>;
    markOneRead(userId: string, id: string): Promise<{
        ok: boolean;
    }>;
    create(userId: string, title: string, body: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        body: string;
        read: boolean;
    }>;
    generateSmartNotifications(userId: string): Promise<number>;
}
