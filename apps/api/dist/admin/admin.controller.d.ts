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
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
    }[]>;
}
