import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
export declare class FinancesController {
    private readonly financesService;
    constructor(financesService: FinancesService);
    create(req: any, createFinanceDto: CreateFinanceDto): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    findAll(req: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }[]>;
    getSummary(req: any): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
    }>;
    findOne(req: any, id: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    update(req: any, id: string, updateFinanceDto: UpdateFinanceDto): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
}
