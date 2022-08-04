import { TableColumnOptions } from 'typeorm';

export const columnsBase: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    generationStrategy: 'uuid',
    default: 'uuid_generate_v4()',
  },
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
];
