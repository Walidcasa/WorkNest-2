import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber: string;
        accountType: import(".prisma/client").$Enums.AccountType;
        plan: import(".prisma/client").$Enums.Plan;
    }>;
    updateProfile(req: any, data: any): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
}
