import { BaseEntity } from '../../base/entities/base.entity';
import { Role } from './role.entity';

export class User extends BaseEntity {
  public name: string;
  public password: string;
  public email: string;
  public old: number;
  public role: Role;
}
