import { BaseUseCase } from '@core/base/use-cases/use-case';
import { CreateRoleMapper } from '@core/domain/mappers/role/create-role.mapper';
import { RoleCreateDto } from '@presentation/dtos/role/role-create.dto';
import { RoleRepository } from '@core/domain/repositories/role.repository';
import { RoleCreatedDto } from '@presentation/dtos/role/role-created.dto';

export class CreateRoleUseCase implements BaseUseCase {
  constructor(
    private readonly createRoleMapper: CreateRoleMapper,
    private readonly roleRepository: RoleRepository,
  ) { }

  public async execute(createRoleData: RoleCreateDto): Promise<RoleCreatedDto> {
    const role = this.createRoleMapper.mapFrom(createRoleData);
    const savedRole = await this.roleRepository.save(role);
    return this.createRoleMapper.mapTo(savedRole);
  }
}
