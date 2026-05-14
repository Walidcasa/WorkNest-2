import { CreateFinanceDto } from './create-finance.dto';

export class UpdateFinanceDto implements Partial<CreateFinanceDto> {
  type?: 'REVENUE' | 'EXPENSE';
  amount?: number;
  category?: string;
  description?: string;
  date?: string;
}
