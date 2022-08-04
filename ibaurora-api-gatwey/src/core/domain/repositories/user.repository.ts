import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  // findOne(conditions?: any, options?: (keyof User)[]): Promise<User>;
  findByEmail(email: string, relations?: string[]): Promise<User>;
  save(user: User): Promise<User>;
}
