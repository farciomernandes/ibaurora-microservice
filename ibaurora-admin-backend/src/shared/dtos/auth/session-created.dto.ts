import { Expose } from 'class-transformer';
import { UserCreatedDto } from '@presentation/dtos/user/user-created.dto';

export class SessionCreatedDto {
  @Expose()
  user: UserCreatedDto;

  @Expose()
  token: string;
}
