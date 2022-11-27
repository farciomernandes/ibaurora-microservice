import { BaseEntity } from '../../base/entities/base.entity';
import { User } from './user.entity';

export class PrayerRequest extends BaseEntity {
  public title: string;
  public description: string;
  public was_answered: boolean;
  public user: User;
}
