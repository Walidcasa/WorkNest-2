import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(req: any): Promise<{
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
    create(req: any, data: any): Promise<{
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
    update(req: any, id: string, data: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
