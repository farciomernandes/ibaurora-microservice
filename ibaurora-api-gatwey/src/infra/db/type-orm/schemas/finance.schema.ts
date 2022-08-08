import { Finance } from '@core/domain/entities/finance.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schemas.enum';
import { baseSchema } from './base/base.schema';

export const FinanceSchema = new EntitySchema<Finance>({
  schema: SchemasEnum.finances,
  name: Finance.name,
  target: Finance,
  tableName: 'finances',
  columns: {
    ...baseSchema,
    value: {
      type: 'integer',
      nullable: false,
    },
    title: {
      type: 'varchar',
      nullable: false,
    },
    type: {
      type: 'enum',
      enum: ['entrada', 'saida'],
      nullable: false,
    },
  },
});
