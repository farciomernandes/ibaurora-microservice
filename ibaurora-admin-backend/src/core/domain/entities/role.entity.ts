import { BaseEntity } from '../../base/entities/base.entity';
import { User } from './user.entity';

export class Role extends BaseEntity {
  public name: string;
  public description: string;
  public label: string;
  public user: User;
}
