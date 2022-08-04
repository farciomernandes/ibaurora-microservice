import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientCreateDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsNotEmpty()
  old: number;

  @Expose()
  @IsString()
  @IsOptional()
  photo: string;

  @Expose()
  @IsOptional()
  cpf: number;
}
