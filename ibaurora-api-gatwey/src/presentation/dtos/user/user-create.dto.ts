import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegexHelper } from '@shared/helpers/regex.helper';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { Expose } from 'class-transformer';

export class UserCreateDto {
  @Expose()
  @ApiProperty({
    description: 'Name of user',
    example: 'Usuário da Silva',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Email of user',
    example: 'usuariodasilva@email.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Password of user',
    example: 'Usemobile@123',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
  password: string;

  @Expose()
  @ApiProperty({
    description: 'Role of user',
    example: '2c8aabfd-eb7c-433f-b127-b04fd0c169cc',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  roleId: string;
}
