import { PrismaService } from '../prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
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
    }>;
    findAll(userId: string): Promise<({
        projects: {
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
        }[];
    } & {
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
    })[]>;
    findOne(id: string, userId: string): Promise<{
        projects: {
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
        }[];
    } & {
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
    }>;
    update(id: string, userId: string, data: any): Promise<{
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
    }>;
    remove(id: string, userId: string): Promise<{
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
    }>;
    getSummary(userId: string): Promise<{
        totalClients: number;
        totalPaid: number;
        totalPending: number;
    }>;
}
