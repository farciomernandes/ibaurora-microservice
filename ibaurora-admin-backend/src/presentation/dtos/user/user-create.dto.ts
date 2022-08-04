import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { RegexHelper } from '@shared/helpers/regex.helper';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { Expose } from 'class-transformer';

export class UserCreateDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: MessagesHelper.INVALID_PASSWORD })
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  old: number;

  @Expose()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  roleId: string;
}
