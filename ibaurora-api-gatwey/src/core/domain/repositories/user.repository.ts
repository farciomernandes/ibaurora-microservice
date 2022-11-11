import { UserCreateDto } from '@/presentation/dtos/user';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findOne(conditions?: any, options?: (keyof User)[]): Promise<User>;
  findByEmail(email: string, relations?: string[]): Promise<User>;
  save(user: User): Promise<User>;
  update(
    id: string,
    userUpdateDto: Omit<UserCreateDto, 'roleId'>,
  ): Promise<User>;
  remove(id: string): Promise<void>;
}
