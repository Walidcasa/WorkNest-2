import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
export declare class FinancesController {
    private readonly financesService;
    constructor(financesService: FinancesService);
    create(req: any, createFinanceDto: CreateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }[]>;
    getSummary(req: any): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
    }>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    update(req: any, id: string, updateFinanceDto: UpdateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
}
