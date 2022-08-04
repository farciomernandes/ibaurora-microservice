import { Module } from '@nestjs/common';
import { RoleController } from '@presentation/role.controller';
import { roleProviders } from './role.provider';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [...roleProviders],
})
export class RoleModule {}
