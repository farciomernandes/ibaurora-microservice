import { Expose } from 'class-transformer';

export class CreatedDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
