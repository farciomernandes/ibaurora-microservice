import { ProxyRMQModule } from '@/infra/proxyrmq/proxyrmq.module';
import { Module } from '@nestjs/common';
import { UserController } from '@presentation/user.controller';
import { userProvider } from './user.provider';

@Module({
  imports: [ProxyRMQModule],
  controllers: [UserController],
  providers: [...userProvider],
})
export class UserModule {}
