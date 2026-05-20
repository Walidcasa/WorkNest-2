import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(req: any): Promise<({
        projects: {
            id: string;
            userId: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.ProjectStatus;
            clientId: string | null;
            title: string;
            description: string | null;
            startDate: Date | null;
            endDate: Date | null;
            deadline: Date | null;
            progress: number;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string | null;
        status: string;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    })[]>;
    getSummary(req: any): Promise<{
        totalClients: number;
        totalPaid: number;
        totalPending: number;
    }>;
    create(req: any, data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string | null;
        status: string;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    update(req: any, id: string, data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string | null;
        status: string;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        email: string | null;
        phone: string | null;
        status: string;
        totalPaid: number;
        remainingBalance: number;
        notes: string | null;
    }>;
}
