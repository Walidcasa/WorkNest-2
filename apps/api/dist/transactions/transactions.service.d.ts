import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        label: string;
        date: Date;
        createdAt: Date;
    }>;
    findAll(userId: string, query: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        label: string;
        date: Date;
        createdAt: Date;
    }[]>;
    getSummary(userId: string): Promise<{
        totalIncome: number;
        totalExpenses: number;
        netCashFlow: number;
    }>;
}
