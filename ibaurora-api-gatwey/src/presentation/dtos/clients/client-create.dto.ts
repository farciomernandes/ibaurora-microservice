import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientCreateDto {
  @Expose()
  @ApiProperty({
    description: 'Name of client',
    example: 'Fulano dos Santos Medeiros',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Description to user',
    example:
      'Possui depedência quimica em cigarro e alcóol, depressão. Não temos contato com a familia',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Old to user',
    example: 35,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  old: number;

  @Expose()
  @ApiProperty({
    description: 'Url with photo to user',
    example:
      'https://avatars.githubusercontent.com/u/57499538?s=400&u=379b3a8fbce6927815cb3b46262d5af9b22cfac0&v=4',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  photo: string;

  @Expose()
  @ApiProperty({
    description: 'Cpf to user',
    example: 11122233344,
    type: String,
    required: false,
  })
  @IsOptional()
  cpf: number;
}
