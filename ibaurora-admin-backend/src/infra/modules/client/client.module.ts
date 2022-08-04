import { ClientController } from '@/presentation/client.controller';
import { Module } from '@nestjs/common';
import { clientProviders } from './client.provide';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [...clientProviders],
})
export class ClientModule {}
