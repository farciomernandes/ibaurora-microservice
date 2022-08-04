import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RoleCreateDto } from './role-create.dto';

export class RoleCreatedDto extends RoleCreateDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'be286530-872a-4342-9ffa-eaf67c0085fe',
    description: 'Id of the user',
    required: false,
  })
  id: string;
}
