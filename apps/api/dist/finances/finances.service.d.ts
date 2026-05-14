import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
export declare class FinancesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createFinanceDto: CreateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
    }>;
    update(id: string, userId: string, updateFinanceDto: UpdateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
    }>;
    getSummary(userId: string): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
    }>;
}
