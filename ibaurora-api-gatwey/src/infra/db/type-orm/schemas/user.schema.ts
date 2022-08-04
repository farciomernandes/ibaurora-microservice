import { User } from '@core/domain/entities/user.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schemas.enum';
import { baseSchema } from './base/base.schema';

export const UserSchema = new EntitySchema<User>({
  schema: SchemasEnum.users,
  name: User.name,
  target: User,
  tableName: 'users',
  columns: {
    ...baseSchema,
    name: {
      type: 'varchar',
      nullable: false,
    },
    email: {
      type: 'varchar',
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      nullable: false,
    },
  },
  relations: {
    role: {
      nullable: false,
      target: 'roles',
      type: 'many-to-one',
      joinColumn: { name: 'role_id', referencedColumnName: 'id' },
      onDelete: 'NO ACTION',
    },
  },
});
