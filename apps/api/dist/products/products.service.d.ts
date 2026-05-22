import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        name: string;
        id: string;
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
    create(userId: string, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
    findOne(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
    update(id: string, userId: string, data: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
    remove(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        userId: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
}
