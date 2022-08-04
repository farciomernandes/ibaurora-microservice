import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { columnsBase } from './base/columns-base.migration';
import { SchemasEnum } from '../../schemas.enum';

export class createTableRoles1654815308000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: SchemasEnum.users,
        name: 'roles',
        columns: [
          ...columnsBase,
          {
            name: 'label',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
