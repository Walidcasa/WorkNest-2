import { PrismaService } from '../prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        userId: string;
        phone: string | null;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    findAll(userId: string): Promise<({
        projects: {
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
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        userId: string;
        phone: string | null;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        projects: {
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
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        userId: string;
        phone: string | null;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        userId: string;
        phone: string | null;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        userId: string;
        phone: string | null;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    getSummary(userId: string): Promise<{
        totalClients: number;
        totalPaid: number;
        totalPending: number;
    }>;
}
