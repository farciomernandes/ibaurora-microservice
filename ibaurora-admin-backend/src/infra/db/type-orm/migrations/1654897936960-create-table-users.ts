import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { columnsBase } from './base/columns-base.migration';
import { SchemasEnum } from '../../schemas.enum';

export class createTableUsers1654897936960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: SchemasEnum.users,
        name: 'users',
        columns: [
          ...columnsBase,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    const userTable = await queryRunner.getTable('users.users');
    await queryRunner.createForeignKey(
      userTable,
      new TableForeignKey({
        referencedSchema: SchemasEnum.users,
        name: 'user_roles_fk',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'user_roles_fk');
    await queryRunner.dropTable('users');
  }
}
