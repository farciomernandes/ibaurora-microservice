import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDto } from '@presentation/dtos/user/user-created.dto';

export class SessionCreatedDto {
  @Expose()
  @ApiProperty({ type: UserCreatedDto })
  user: UserCreatedDto;

  @Expose()
  @ApiProperty({
    example: 'asd65as4d.ASDas1d351a3s51das.ass654',
  })
  token: string;
}
