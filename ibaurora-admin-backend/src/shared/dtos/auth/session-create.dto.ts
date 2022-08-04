import { IsEmail, IsString, MinLength } from 'class-validator';

export class SessionCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
