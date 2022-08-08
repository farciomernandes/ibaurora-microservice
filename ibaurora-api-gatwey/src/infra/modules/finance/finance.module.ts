import { ProxyRMQModule } from '@/infra/proxyrmq/proxyrmq.module';
import { FinanceController } from '@/presentation/finance.controller';
import { Module } from '@nestjs/common';
import { financeProviders } from './finance.provider';

@Module({
  imports: [ProxyRMQModule],
  controllers: [FinanceController],
  providers: [...financeProviders],
})
export class FinanceModule {}
