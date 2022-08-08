import { FinanceRepository } from '@core/domain/repositories/finance.repository';
import { Repository } from 'typeorm';
import { CreateFinanceMapper } from '@core/domain/mappers/finance/create-finance.mapper';
import { Finance } from '@core/domain/entities/finance.entity';
import { FinanceCreateDto } from '@presentation/dtos/finance/finance-create.dto';

export class FinanceTypeOrmRepository implements FinanceRepository {
  constructor(
    private readonly createFinanceMapper: CreateFinanceMapper,
    private readonly financeRepository: Repository<Finance>,
  ) {}
  findAll(): Promise<Finance[]> {
    return this.financeRepository.find();
  }
  findById(id: string): Promise<Finance> {
    return this.financeRepository.findOne({ where: { id } });
  }
  save(createFinanceDto: FinanceCreateDto): Promise<Finance> {
    const finance = this.financeRepository.create(
      this.createFinanceMapper.mapFrom(createFinanceDto),
    );
    return this.financeRepository.save(finance);
  }
}
