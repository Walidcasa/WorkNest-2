import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private activitiesService;
    constructor(activitiesService: ActivitiesService);
    log(req: any, data: any): Promise<{
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
    findToday(req: any): Promise<{
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
    getFocusScore(req: any): Promise<number>;
    getBreakdown(req: any): Promise<{
        PRODUCTIVE: number;
        NEUTRAL: number;
        WASTE: number;
    }>;
}
