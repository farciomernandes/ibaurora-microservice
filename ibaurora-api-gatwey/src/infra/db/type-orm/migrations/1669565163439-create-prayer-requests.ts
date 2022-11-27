import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { columnsBase } from './base/columns-base.migration';
import { SchemasEnum } from '../../schemas.enum';

export class createTablePrayerRequests1669565163439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: SchemasEnum.users,
        name: 'prayer_requests',
        columns: [
          ...columnsBase,
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'was_answered',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
        ],
      }),
    );
    const userTable = await queryRunner.getTable('users.users');
    await queryRunner.createForeignKey(
      userTable,
      new TableForeignKey({
        referencedSchema: SchemasEnum.users,
        name: 'user_prayer_requests_fk',
        columnNames: ['prayer_requests_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prayer_requests',
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'prayer_requests',
      'user_prayer_requests_fk',
    );
    await queryRunner.dropTable('prayer_requests');
  }
}
