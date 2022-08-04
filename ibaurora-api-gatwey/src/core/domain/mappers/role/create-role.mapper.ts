import { plainToClass } from 'class-transformer';
import { MapFrom } from '@core/base/mappers/map-from';
import { MapTo } from '@core/base/mappers/map-to';
import { Role } from '../../entities/role.entity';
import { RoleCreateDto } from '@presentation/dtos/role/role-create.dto';
import { RoleCreatedDto } from '@presentation/dtos/role/role-created.dto';

export class CreateRoleMapper
  implements MapFrom<RoleCreateDto, Role>, MapTo<Role, RoleCreateDto>
{
  public mapFrom({ label, description, name }: RoleCreateDto): Role {
    const role = new Role();
    role.label = label;
    role.name = name;
    role.description = description;
    return role;
  }
  public mapTo(data: Role): RoleCreatedDto {
    return plainToClass(RoleCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
