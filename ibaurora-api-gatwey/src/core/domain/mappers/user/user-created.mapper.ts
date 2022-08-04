import { User } from '@core/domain/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserCreatedDto } from '@presentation/dtos/user';
import { MapTo } from '@core/base/mappers/map-to';

export class UserCreatedMapper implements MapTo<User, UserCreatedDto> {
  public mapTo(data: User): UserCreatedDto {
    delete data.password;
    return plainToClass(UserCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
