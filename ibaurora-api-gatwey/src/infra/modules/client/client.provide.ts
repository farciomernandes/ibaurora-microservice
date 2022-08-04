import { CreateClientUseCase } from '@/core/application/client/create-client.use-case';
import { GetAllClientsUseCase } from '@/core/application/client/get-all-clients.use-case';
import { Client } from '@/core/domain/entities/client.entity';
import { CreateClientMapper } from '@/core/domain/mappers/client/create-client.mapper';
import { ClientRepository } from '@/core/domain/repositories/client.repository';
import { ClientTypeOrmRepository } from '@/infra/db/type-orm/repositories/client-typeorm.repository';
import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const clientProviders: Provider[] = [
  {
    provide: GetAllClientsUseCase,
    useFactory: (clientRepository: ClientRepository): GetAllClientsUseCase => {
      return new GetAllClientsUseCase(clientRepository);
    },
    inject: [ClientTypeOrmRepository],
  },
  {
    provide: CreateClientMapper,
    useClass: CreateClientMapper,
  },
  {
    provide: ClientTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ClientTypeOrmRepository(dataSource.getRepository(Client));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CreateClientUseCase,
    useFactory: (
      createClientMapper: CreateClientMapper,
      clientRepository: ClientRepository,
    ): CreateClientUseCase => {
      return new CreateClientUseCase(createClientMapper, clientRepository);
    },
    inject: [CreateClientMapper, ClientTypeOrmRepository],
  },
];
