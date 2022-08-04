import { BaseUseCase } from '@/core/base/use-cases/use-case';
import { Client } from '@/core/domain/entities/client.entity';
import { DomainError } from '@/core/domain/errors';
import { ClientRepository } from '@/core/domain/repositories/client.repository';

export class GetAllClientsUseCase implements BaseUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async execute(): Promise<Client[]> {
    const clients: Client[] = await this.clientRepository.findAll();

    if (clients === undefined || clients === null) {
      throw DomainError.GenericErrorGetAllClients;
    }

    return clients;
  }
}
