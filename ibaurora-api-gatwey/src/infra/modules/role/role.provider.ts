import { Provider } from '@nestjs/common';
import { RoleTypeOrmRepository } from 'src/infra/db/type-orm/repositories/role-typeorm.repository';
import { CreateRoleUseCase } from '@core/application/role/create-role.use-case';
import { CreateRoleMapper } from '@core/domain/mappers/role/create-role.mapper';
import { Role } from '@core/domain/entities/role.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { RoleRepository } from '@core/domain/repositories/role.repository';
import { DataSource } from 'typeorm';

export const roleProviders: Provider[] = [
  {
    provide: CreateRoleMapper,
    useClass: CreateRoleMapper,
  },
  {
    provide: RoleTypeOrmRepository,
    useFactory: (
      createRoleMapper: CreateRoleMapper,
      dataSource: DataSource,
    ) => {
      return new RoleTypeOrmRepository(
        createRoleMapper,
        dataSource.getRepository(Role),
      );
    },
    inject: [CreateRoleMapper, getDataSourceToken()],
  },
  {
    provide: CreateRoleUseCase,
    useFactory: (
      createRoleMapper: CreateRoleMapper,
      roleRepository: RoleRepository,
    ): CreateRoleUseCase => {
      return new CreateRoleUseCase(createRoleMapper, roleRepository);
    },
    inject: [CreateRoleMapper, RoleTypeOrmRepository],
  },
];
