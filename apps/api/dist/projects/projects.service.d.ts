import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string | null;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
        status: import(".prisma/client").$Enums.ProjectStatus;
    }>;
    findAll(userId: string): Promise<({
        client: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            userId: string;
            phone: string | null;
            totalPaid: number;
            remainingBalance: number;
            notes: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        description: string | null;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
        status: import(".prisma/client").$Enums.ProjectStatus;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        client: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            userId: string;
            phone: string | null;
            totalPaid: number;
            remainingBalance: number;
            notes: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        description: string | null;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
        status: import(".prisma/client").$Enums.ProjectStatus;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string | null;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
        status: import(".prisma/client").$Enums.ProjectStatus;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string | null;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
        status: import(".prisma/client").$Enums.ProjectStatus;
    }>;
}
