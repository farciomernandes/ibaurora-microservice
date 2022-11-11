import { UserRepository } from '@core/domain/repositories/user.repository';
import { UserCreatedDto } from '@presentation/dtos/user/user-created.dto';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { User } from '@core/domain/entities/user.entity';
import { UserCreatedMapper } from '@core/domain/mappers/user/user-created.mapper';
import { DomainError } from '@core/domain/errors';

export class GetUserUsecase implements BaseUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: string): Promise<UserCreatedDto> {
    const user: User = await this.userRepository.findOne({ where: { id } });

    if (user === undefined || user === null) {
      throw DomainError.GenericErrorGetAllUsers;
    }
    return new UserCreatedMapper().mapTo(user);
  }
}
