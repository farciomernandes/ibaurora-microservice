import { Finance } from '../entities/finance.entity';

export interface FinanceRepository {
  findAll(): Promise<Finance[]>;
  findById(id: string, relations?: string[]): Promise<Finance>;
  save(finance: Finance): Promise<Finance>;
}
