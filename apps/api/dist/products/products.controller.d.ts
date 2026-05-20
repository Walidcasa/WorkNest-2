import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(req: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }[]>;
    create(req: any, data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
    update(req: any, id: string, data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        name: string;
        purchasePrice: number;
        sellingPrice: number;
        stock: number;
        sold: number;
        supplier: string | null;
        purchaseDate: Date | null;
        lowStockAt: number;
    }>;
}
