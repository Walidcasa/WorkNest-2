import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
    }>;
    findAll(userId: string): Promise<({
        client: {
            email: string | null;
            name: string;
            id: string;
            createdAt: Date;
            userId: string;
            phone: string | null;
            status: string;
            totalPaid: number;
            remainingBalance: number;
            notes: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        client: {
            email: string | null;
            name: string;
            id: string;
            createdAt: Date;
            userId: string;
            phone: string | null;
            status: string;
            totalPaid: number;
            remainingBalance: number;
            notes: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        userId: string;
        status: import(".prisma/client").$Enums.ProjectStatus;
        clientId: string | null;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
        deadline: Date | null;
        progress: number;
    }>;
}
