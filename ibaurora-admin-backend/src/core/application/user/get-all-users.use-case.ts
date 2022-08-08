import { UserRepository } from '@core/domain/repositories/user.repository';
import { UserCreatedDto } from '@presentation/dtos/user/user-created.dto';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { User } from '@core/domain/entities/user.entity';
import { UserCreatedMapper } from '@core/domain/mappers/user/user-created.mapper';
import { DomainError } from '@core/domain/errors';

export class GetAllUsersUseCase implements BaseUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(): Promise<UserCreatedDto[]> {
    const users: User[] = await this.userRepository.findAll();
    if (users === undefined || users === null) {
      throw DomainError.GenericErrorGetAllUsers;
    }
    return users.map(
      (user: User): UserCreatedDto => new UserCreatedMapper().mapTo(user),
    );
  }
}
