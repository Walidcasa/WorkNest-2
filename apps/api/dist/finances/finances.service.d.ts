import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
export declare class FinancesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createFinanceDto: CreateFinanceDto): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    update(id: string, userId: string, updateFinanceDto: UpdateFinanceDto): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        description: string | null;
    }>;
    getSummary(userId: string): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
    }>;
}
