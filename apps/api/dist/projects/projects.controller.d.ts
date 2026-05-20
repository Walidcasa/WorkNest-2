import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(req: any): Promise<({
        client: {
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
        };
    } & {
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
    })[]>;
    create(req: any, data: any): Promise<{
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
    }>;
    update(req: any, id: string, data: any): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
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
    }>;
}
