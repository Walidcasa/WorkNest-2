import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(req: any): Promise<({
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
    create(req: any, data: any): Promise<{
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
    update(req: any, id: string, data: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
