import { Module } from '@nestjs/common';
import { ClientProxyCristolandia } from './client-proxy';

@Module({
  providers: [ClientProxyCristolandia],
  exports: [ClientProxyCristolandia],
})
export class ProxyRMQModule {}
