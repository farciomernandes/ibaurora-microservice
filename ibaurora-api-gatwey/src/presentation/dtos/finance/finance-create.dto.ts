import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FinanceCreateDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Title of transaction',
    example: 'Purchased water to teens.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Value to transaction',
    example: 350,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  value: number;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Type of transaction',
    example: 'entrada or saida',
    required: false,
  })
  @IsString()
  type: string;
}
