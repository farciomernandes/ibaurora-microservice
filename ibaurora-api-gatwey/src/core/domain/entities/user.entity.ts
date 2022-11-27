import { BaseEntity } from '../../base/entities/base.entity';
import { PrayerRequest } from './prayer-request.entity';
import { Role } from './role.entity';

export class User extends BaseEntity {
  public name: string;
  public password: string;
  public email: string;
  public date_of_birth: string;
  public photo: string;
  public phone: string;
  public role: Role;
  public prayer_requests: PrayerRequest[];
}
