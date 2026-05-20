import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, data: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        label: string;
        date: Date;
        createdAt: Date;
    }>;
    findAll(req: any, query: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        label: string;
        date: Date;
        createdAt: Date;
    }[]>;
    getSummary(req: any): Promise<{
        totalIncome: number;
        totalExpenses: number;
        netCashFlow: number;
    }>;
}
