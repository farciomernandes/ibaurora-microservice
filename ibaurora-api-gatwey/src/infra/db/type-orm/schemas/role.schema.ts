import { Role } from '@core/domain/entities/role.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schemas.enum';
import { baseSchema } from './base/base.schema';

export const RoleSchema = new EntitySchema<Role>({
  schema: SchemasEnum.users,
  name: Role.name,
  target: Role,
  tableName: 'roles',
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
    label: {
      type: 'varchar',
      nullable: false,
    },
  },
});
