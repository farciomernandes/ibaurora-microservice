import { Expose } from 'class-transformer';
import { RoleCreateDto } from './role-create.dto';

export class RoleCreatedDto extends RoleCreateDto {
  @Expose()
  id: string;
}
