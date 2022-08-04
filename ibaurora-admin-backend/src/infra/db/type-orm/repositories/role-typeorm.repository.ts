import { RoleRepository } from '@core/domain/repositories/role.repository';
import { Repository } from 'typeorm';
import { CreateRoleMapper } from '@core/domain/mappers/role/create-role.mapper';
import { Role } from '@core/domain/entities/role.entity';
import { RoleCreateDto } from '@presentation/dtos/role/role-create.dto';

export class RoleTypeOrmRepository implements RoleRepository {
  constructor(
    private readonly createRoleMapper: CreateRoleMapper,
    private readonly roleRepository: Repository<Role>,
  ) {}
  findById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }
  save(createRoleDto: RoleCreateDto): Promise<Role> {
    const role = this.roleRepository.create(
      this.createRoleMapper.mapFrom(createRoleDto),
    );
    return this.roleRepository.save(role);
  }
}
