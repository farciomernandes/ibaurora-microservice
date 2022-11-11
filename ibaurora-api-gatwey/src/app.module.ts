import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from './infra/environments';
import { UserModule } from './infra/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './infra/modules/auth/auth.module';
import { TypeOrmDataSource } from './infra/db/database.provider';
import { RoleModule } from './infra/modules/role/role.module';
import { ProxyRMQModule } from './infra/proxyrmq/proxyrmq.module';
import { ClientProxyIbAurora } from './infra/proxyrmq/client-proxy';

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
    ProxyRMQModule,
  ],
  controllers: [AppController],
  providers: [ClientProxyIbAurora],
  exports: [],
})
export class AppModule {}
