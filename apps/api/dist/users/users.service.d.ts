import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        passwordHash: string;
        phoneNumber: string | null;
        emailVerified: boolean;
        verifyToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        accountType: import(".prisma/client").$Enums.AccountType;
        industry: string | null;
        profession: string | null;
        countryCode: string | null;
        currency: string;
        language: string;
        theme: string;
        plan: import(".prisma/client").$Enums.Plan;
        trialEndsAt: Date | null;
        updatedAt: Date;
    }>;
    findOne(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        accountType: import(".prisma/client").$Enums.AccountType;
        plan: import(".prisma/client").$Enums.Plan;
    }>;
}
