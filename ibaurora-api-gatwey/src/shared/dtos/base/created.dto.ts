import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedDto {
  @Expose()
  @ApiProperty({
    description: 'Date of create',
    type: Date,
    nullable: false,
    required: false,
    example: new Date(),
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Date of create',
    type: Date,
    nullable: false,
    required: false,
    example: new Date(),
  })
  updatedAt: Date;
}
