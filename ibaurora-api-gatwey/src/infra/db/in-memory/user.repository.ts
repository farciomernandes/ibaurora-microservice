import { User } from '@core/domain/entities/user.entity';
import { UserRepository } from '@core/domain/repositories/user.repository';

export class UserInMemoryRepository implements UserRepository {
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findOne(conditions?: any, options?: (keyof User)[]): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  items: User[] = [];
  async save(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }
}
