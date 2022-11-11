import { Expose } from 'class-transformer';

export class UserCreatedDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  date_of_birth: number;

  @Expose()
  photo: string;

  @Expose()
  role: string;
}
