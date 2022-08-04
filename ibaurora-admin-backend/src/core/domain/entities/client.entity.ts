import { BaseEntity } from '../../base/entities/base.entity';

export class Client extends BaseEntity {
  public name: string;
  public description: string;
  public old: number;
  public photo: string;
  public cpf: number;
}
