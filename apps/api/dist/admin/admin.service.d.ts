import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getGlobalStats(): Promise<{
        totalUsers: number;
        premiumUsers: number;
        totalRevenue: number;
        conversionRate: number;
        usersByCountry: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.UserGroupByOutputType, "countryCode"[]> & {
            _count: number;
        })[];
    }>;
    getAllUsers(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
    }[]>;
}
