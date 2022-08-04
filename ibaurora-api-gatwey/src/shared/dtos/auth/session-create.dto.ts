import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SessionCreateDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'fulano@usemobile.xyz',
    description: 'Email utilizado para fazer login no sistema',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'strong_password',
    description: 'Senha utilizada para fazer login no sistema',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
