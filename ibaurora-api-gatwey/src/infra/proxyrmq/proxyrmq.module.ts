import { Module } from '@nestjs/common';
import { ClientProxyIbAurora } from './client-proxy';

@Module({
  providers: [ClientProxyIbAurora],
  exports: [ClientProxyIbAurora],
})
export class ProxyRMQModule {}
