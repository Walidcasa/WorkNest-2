import { PrismaService } from '../prisma/prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    log(userId: string, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        date: Date;
        userId: string;
        level: import(".prisma/client").$Enums.ProductivityLevel;
        duration: number;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    findToday(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        category: string;
        date: Date;
        userId: string;
        level: import(".prisma/client").$Enums.ProductivityLevel;
        duration: number;
        startTime: Date | null;
        endTime: Date | null;
    }[]>;
    getFocusScore(userId: string): Promise<number>;
    getBreakdown(userId: string): Promise<{
        PRODUCTIVE: number;
        NEUTRAL: number;
        WASTE: number;
    }>;
}
