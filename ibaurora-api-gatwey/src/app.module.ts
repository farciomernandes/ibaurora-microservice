import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from './infra/environments';
import { UserModule } from './infra/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './infra/modules/auth/auth.module';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleModule } from './infra/modules/role/role.module';
import { ClientModule } from './infra/modules/client/client.module';
import { ProxyRMQModule } from './infra/proxyrmq/proxyrmq.module';
import { ClientProxyCristolandia } from './infra/proxyrmq/client-proxy';
import { FinanceModule } from './infra/modules/finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        const dataSource = await TypeOrmDataSource.initialize();
        return dataSource;
      },
    }),
    UserModule,
    AuthModule,
    RoleModule,
    FinanceModule,
    ClientModule,
    ProxyRMQModule,
  ],
  controllers: [AppController],
  providers: [ClientProxyCristolandia],
  exports: [],
})
export class AppModule {}
