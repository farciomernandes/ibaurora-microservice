import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegexHelper } from '@/shared/helpers/regex.helper';
import { MessagesHelper } from '@/shared/helpers/messages.helper';

@Injectable()
export class UserUpdateDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'Usuário da Silva',
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Email of user',
    example: 'usuariodasilva@email.com',
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'Usemobile@123',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Matches(RegexHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
  password: string;

  @ApiProperty({
    description: 'Date of birth',
    type: String,
  })
  @IsString()
  @IsOptional()
  date_of_birth: string;

  @ApiProperty({
    description: 'Photo uri of user',
    example: 'Usemobile@123',
    type: String,
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    description: 'Phone number of user',
    example: '88991613615',
    type: String,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'Role of user',
    example: '2c8aabfd-eb7c-433f-b127-b04fd0c169cc',
    type: String,
  })
  @IsUUID()
  @IsString()
  @IsOptional()
  roleId: string;
}
