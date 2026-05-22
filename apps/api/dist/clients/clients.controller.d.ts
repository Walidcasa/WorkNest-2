import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(req: any): Promise<({
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
    getSummary(req: any): Promise<{
        totalClients: number;
        totalPaid: number;
        totalPending: number;
    }>;
    create(req: any, data: any): Promise<{
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
    update(req: any, id: string, data: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
