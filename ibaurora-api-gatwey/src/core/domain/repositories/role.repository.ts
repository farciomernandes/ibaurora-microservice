import { Role } from '../entities/role.entity';

export interface RoleRepository {
  findById(id: string): Promise<Role>;
  save(user: Role): Promise<Role>;
}
