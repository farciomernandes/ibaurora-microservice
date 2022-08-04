import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationFilter {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit = 10;
}
