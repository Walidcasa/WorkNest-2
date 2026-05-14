import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private activitiesService;
    constructor(activitiesService: ActivitiesService);
    log(req: any, data: any): Promise<{
        level: import(".prisma/client").$Enums.ProductivityLevel;
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        category: string;
        date: Date;
        duration: number;
        startTime: Date | null;
        endTime: Date | null;
    }>;
    findToday(req: any): Promise<{
        level: import(".prisma/client").$Enums.ProductivityLevel;
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        category: string;
        date: Date;
        duration: number;
        startTime: Date | null;
        endTime: Date | null;
    }[]>;
    getFocusScore(req: any): Promise<number>;
    getBreakdown(req: any): Promise<{
        PRODUCTIVE: number;
        NEUTRAL: number;
        WASTE: number;
    }>;
}
