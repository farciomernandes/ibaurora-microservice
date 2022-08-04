import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SchemasEnum } from '../../schemas.enum';
import { columnsBase } from './base/columns-base.migration';

export class createClient1657910208550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: SchemasEnum.users,
        name: 'clients',
        columns: [
          ...columnsBase,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'old',
            type: 'integer',
          },
          {
            name: 'cpf',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
