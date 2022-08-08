import { plainToClass } from 'class-transformer';
import { MapFrom } from '@core/base/mappers/map-from';
import { MapTo } from '@core/base/mappers/map-to';
import { Finance } from '../../entities/finance.entity';
import { FinanceCreateDto } from '@presentation/dtos/finance/finance-create.dto';
import { FinanceCreatedDto } from '@presentation/dtos/finance/finance-created.dto';

export class CreateFinanceMapper
  implements
    MapFrom<FinanceCreateDto, Finance>,
    MapTo<Finance, FinanceCreateDto>
{
  public mapFrom({ title, type, value }: FinanceCreateDto): Finance {
    const finance = new Finance();
    finance.title = title;
    finance.type = type;
    finance.value = value;
    return finance;
  }
  public mapTo(data: Finance): FinanceCreatedDto {
    return plainToClass(FinanceCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
