import { MigrationInterface, QueryRunner } from 'typeorm';
import { SchemasEnum } from '../../schemas.enum';

export class createSchemas1654815208000 implements MigrationInterface {
  public schemas = [SchemasEnum.users, SchemasEnum.finances];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    for (const schema of this.schemas) {
      if (!(await queryRunner.hasSchema(schema))) {
        await queryRunner.createSchema(schema);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const schema of this.schemas) {
      if (await queryRunner.hasSchema(schema)) {
        await queryRunner.dropSchema(schema);
      }
    }
  }
}
