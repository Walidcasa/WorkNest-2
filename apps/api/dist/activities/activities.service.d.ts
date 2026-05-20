import { PrismaService } from '../prisma/prisma.service';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    log(userId: string, data: any): Promise<{
        level: import(".prisma/client").$Enums.ProductivityLevel;
        id: string;
        userId: string;
        category: string;
        date: Date;
        createdAt: Date;
        name: string;
        duration: number;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    findToday(userId: string): Promise<{
        level: import(".prisma/client").$Enums.ProductivityLevel;
        id: string;
        userId: string;
        category: string;
        date: Date;
        createdAt: Date;
        name: string;
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
