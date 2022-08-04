import { MapFrom } from '@/core/base/mappers/map-from';
import { ClientCreateDto } from '@/presentation/dtos/clients';
import { Client } from '../../entities/client.entity';

export class CreateClientMapper implements MapFrom<ClientCreateDto, Client> {
  mapFrom({ name, cpf, description, old, photo }: ClientCreateDto): Client {
    const client = new Client();
    client.cpf = cpf;
    client.description = description;
    client.name = name;
    client.old = old;
    client.photo = photo;
    return client;
  }
}
