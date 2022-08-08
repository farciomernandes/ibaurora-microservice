import { Expose } from 'class-transformer';

export class UserCreatedDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  old: number;

  @Expose()
  photo: string;

  @Expose()
  role: string;
}
