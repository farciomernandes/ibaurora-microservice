import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Token of auth user',
    example: 'asd65as4d.ASDas1d351a3s51das.ass654',
    required: false,
    nullable: false,
  })
  token: string;
}
