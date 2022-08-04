import { ProxyRMQModule } from '@/infra/proxyrmq/proxyrmq.module';
import { ClientController } from '@/presentation/client.controller';
import { Module } from '@nestjs/common';
import { clientProviders } from './client.provide';

@Module({
  imports: [ProxyRMQModule],
  controllers: [ClientController],
  providers: [...clientProviders],
})
export class ClientModule {}
