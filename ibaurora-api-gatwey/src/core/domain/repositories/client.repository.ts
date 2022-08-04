import { Client } from '../entities/client.entity';

export interface ClientRepository {
  findAll(): Promise<Client[]>;
  findByName(name: string, relations?: string[]): Promise<Client>;
  save(client: Client): Promise<Client>;
}
