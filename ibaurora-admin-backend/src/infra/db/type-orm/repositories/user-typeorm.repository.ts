import { User } from '@core/domain/entities/user.entity';
import { UserRepository } from '@core/domain/repositories/user.repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string, relations?: string[]): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  save(userData: User): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  //   public async findOne(
  //     conditions: FindConditions<User>,
  //     options?: FindOneOptions<User>,
  //   ): Promise<User> {
  //     try {
  //       return await this.userRepository.findOneOrFail(conditions, options);
  //     } catch (error) {
  //       throw new NotFoundException('Register not found');
  //     }
  //   }

  //   public async update(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
  //     // let user = await this.findOne({ id });
  //     // delete user.role;
  //     // user = await this.userRepository.merge(user, userUpdateDto);
  //     // return await this.userRepository.save(user);
  //     return null;
  //   }

  //   public async remove(id: string): Promise<void> {
  //     const user = await this.findOne({ id });
  //     await this.userRepository.softDelete(user);
  //   }
}
