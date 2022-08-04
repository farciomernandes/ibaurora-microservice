import { BaseUseCase } from '@/core/base/use-cases/use-case';
import { DomainError } from '@/core/domain/errors';
import { CreateClientMapper } from '@/core/domain/mappers/client/create-client.mapper';
import { ClientRepository } from '@/core/domain/repositories/client.repository';
import { ClientCreateDto } from '@/presentation/dtos/clients';

export class CreateClientUseCase implements BaseUseCase {
  constructor(
    private readonly createClientMapper: CreateClientMapper,
    private readonly clientRepository: ClientRepository,
  ) {}
  public async execute(createClientData: ClientCreateDto) {
    const findClientByName = await this.clientRepository.findByName(
      createClientData.name,
    );
    if (findClientByName) {
      throw DomainError.ClientAlreadyExists;
    }

    const clientEntity = this.createClientMapper.mapFrom(createClientData);

    const client = await this.clientRepository.save(clientEntity);
    return client;
  }
}
