import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoleCreateDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Name of the role',
    example: 'Gerente do sistema',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Label of the role',
    example: 'manager',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Description of the role',
    example: 'O gerente tem acesso a toda a dashboard ...',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
