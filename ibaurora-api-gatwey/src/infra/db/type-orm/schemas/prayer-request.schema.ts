import { PrayerRequest } from '@/core/domain/entities/prayer-request.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schemas.enum';
import { baseSchema } from './base/base.schema';

export const PrayerRequestSchema = new EntitySchema<PrayerRequest>({
  schema: SchemasEnum.users,
  name: PrayerRequest.name,
  target: PrayerRequest,
  tableName: 'prayer_requests',
  columns: {
    ...baseSchema,
    title: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
    was_answered: {
      type: 'boolean',
      nullable: false,
    },
  },
});
