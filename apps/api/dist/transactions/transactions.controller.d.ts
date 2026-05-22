import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, data: any): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        userId: string;
        label: string;
    }>;
    findAll(req: any, query: any): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        userId: string;
        label: string;
    }[]>;
    getSummary(req: any): Promise<{
        totalIncome: number;
        totalExpenses: number;
        netCashFlow: number;
    }>;
}
