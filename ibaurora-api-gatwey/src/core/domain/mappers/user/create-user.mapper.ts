import { UserCreateDto } from '@presentation/dtos/user/user-create.dto';
import { User } from '@core/domain/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { MapFrom } from '@core/base/mappers/map-from';
import { MapTo } from '@core/base/mappers/map-to';
import { UserCreatedDto } from '@presentation/dtos/user';
import { Role } from '../../entities/role.entity';

export class CreateUserMapper
  implements MapFrom<UserCreateDto, User>, MapTo<User, UserCreatedDto>
{
  public mapFrom({
    email,
    name,
    password,
    roleId,
    date_of_birth,
    phone,
    photo,
  }: UserCreateDto): User {
    const user = new User();
    user.role = new Role();
    user.name = name;
    user.email = email;
    user.date_of_birth = date_of_birth;
    user.phone = phone;
    user.photo = photo;
    user.password = password;
    user.role.id = roleId;
    return user;
  }
  public mapTo(data: User): UserCreatedDto {
    return plainToClass(UserCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
