import { Env } from '../environments';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const TypeOrmDataSource = new DataSource({
  type: 'postgres',
  host: Env.DB_HOST,
  port: Number(Env.DB_PORT),
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME,
  synchronize: false,
  logger: 'advanced-console',
  entities: [join(__dirname, 'type-orm/schemas/*.schema.{js,ts}')],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'type-orm/migrations/*.ts')],
  namingStrategy: new SnakeNamingStrategy(),
});
