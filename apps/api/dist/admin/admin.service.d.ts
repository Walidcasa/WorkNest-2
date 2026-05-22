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
        email: string;
        name: string;
        id: string;
        emailVerified: boolean;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
        createdAt: Date;
    }[]>;
    updateUser(targetId: string, data: {
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
