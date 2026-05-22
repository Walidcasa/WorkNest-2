import { PrismaService } from '../prisma/prisma.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
export declare class FinancesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createFinanceDto: CreateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    update(id: string, userId: string, updateFinanceDto: UpdateFinanceDto): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.FinanceType;
        amount: number;
        category: string;
        description: string | null;
        date: Date;
        userId: string;
    }>;
    getSummary(userId: string): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        netProfit: number;
    }>;
}
