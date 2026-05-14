export declare class CreateFinanceDto {
    type: 'REVENUE' | 'EXPENSE';
    amount: number;
    category: string;
    description?: string;
    date: string;
}
