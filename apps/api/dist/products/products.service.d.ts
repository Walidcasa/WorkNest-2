import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }[]>;
}
