import { Client } from '@/core/domain/entities/client.entity';
import { ClientRepository } from '@/core/domain/repositories/client.repository';
import { Repository } from 'typeorm';

export class ClientTypeOrmRepository implements ClientRepository {
  constructor(private readonly clientRepository: Repository<Client>) {}
  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }
  findByName(name: string, relations?: string[]): Promise<Client> {
    return this.clientRepository.findOne({
      where: { name },
      relations,
    });
  }
  save(clientData: Client): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  //   public async update(id: string, CategorieUpdateDto: CategorieUpdateDto): Promise<Categorie> {
  //     // let Categorie = await this.findOne({ id });
  //     // delete Categorie.role;
  //     // Categorie = await this.categorieRepository.merge(Categorie, CategorieUpdateDto);
  //     // return await this.categorieRepository.save(Categorie);
  //     return null;
  //   }

  //   public async remove(id: string): Promise<void> {
  //     const Categorie = await this.findOne({ id });
  //     await this.categorieRepository.softDelete(Categorie);
  //   }
}
