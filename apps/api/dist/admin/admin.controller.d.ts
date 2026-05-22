import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        totalUsers: number;
        premiumUsers: number;
        totalRevenue: number;
        conversionRate: number;
        usersByCountry: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.UserGroupByOutputType, "countryCode"[]> & {
            _count: number;
        })[];
    }>;
    getUsers(): Promise<{
        email: string;
        name: string;
        id: string;
        emailVerified: boolean;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
        createdAt: Date;
    }[]>;
    updateUser(id: string, body: {
        role?: string;
        plan?: string;
        suspended?: boolean;
    }): Promise<{
        email: string;
        name: string;
        id: string;
        emailVerified: boolean;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
    }>;
}
