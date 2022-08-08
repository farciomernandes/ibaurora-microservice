import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FinanceCreatedDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'be286530-872a-4342-9ffa-eaf67c0085fe',
    description: 'Id of the finance',
    required: false,
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Title of transaction',
    example: 'Purchased water to teens.',
    required: true,
  })
  title: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Value to transaction',
    example: 350,
    required: true,
  })
  value: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Type of transaction',
    example: 'entrada or saida',
    required: false,
  })
  type: string;
}
