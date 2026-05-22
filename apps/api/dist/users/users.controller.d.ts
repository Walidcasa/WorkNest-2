import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
        email: string;
        name: string;
        phoneNumber: string;
        accountType: import(".prisma/client").$Enums.AccountType;
        id: string;
        plan: import(".prisma/client").$Enums.Plan;
    }>;
    updateProfile(req: any, data: any): Promise<{
        email: string;
        name: string;
        phoneNumber: string | null;
        accountType: import(".prisma/client").$Enums.AccountType;
        industry: string | null;
        profession: string | null;
        countryCode: string | null;
        currency: string;
        language: string;
        theme: string;
        id: string;
        passwordHash: string;
        emailVerified: boolean;
        verifyToken: string | null;
        role: import(".prisma/client").$Enums.Role;
        plan: import(".prisma/client").$Enums.Plan;
        trialEndsAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
