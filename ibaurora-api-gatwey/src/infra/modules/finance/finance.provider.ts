import { Provider } from '@nestjs/common';
import { FinanceTypeOrmRepository } from 'src/infra/db/type-orm/repositories/finance-typeorm.repository';
import { CreateFinanceMapper } from '@core/domain/mappers/finance/create-finance.mapper';
import { Finance } from '@core/domain/entities/finance.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const financeProviders: Provider[] = [
  {
    provide: CreateFinanceMapper,
    useClass: CreateFinanceMapper,
  },
  {
    provide: FinanceTypeOrmRepository,
    useFactory: (
      CreateFinanceMapper: CreateFinanceMapper,
      dataSource: DataSource,
    ) => {
      return new FinanceTypeOrmRepository(
        CreateFinanceMapper,
        dataSource.getRepository(Finance),
      );
    },
    inject: [CreateFinanceMapper, getDataSourceToken()],
  },
];
