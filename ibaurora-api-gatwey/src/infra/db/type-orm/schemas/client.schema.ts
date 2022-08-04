import { Client } from '@core/domain/entities/client.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schemas.enum';
import { baseSchema } from './base/base.schema';

export const ClientSchema = new EntitySchema<Client>({
  schema: SchemasEnum.users,
  name: Client.name,
  target: Client,
  tableName: 'clients',
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      nullable: false,
    },
    old: {
      type: 'integer',
      nullable: false,
    },
    photo: {
      type: 'varchar',
      nullable: true,
    },
    cpf: {
      type: 'integer',
      nullable: true,
    },
  },
});
