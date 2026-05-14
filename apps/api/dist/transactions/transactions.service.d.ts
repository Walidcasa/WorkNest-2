import { PrismaService } from '../prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        label: string;
    }>;
    findAll(userId: string, query: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        label: string;
    }[]>;
    getSummary(userId: string): Promise<{
        totalIncome: number;
        totalExpenses: number;
        netCashFlow: number;
    }>;
}
