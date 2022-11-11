import { UserRepository } from '@core/domain/repositories/user.repository';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { UserCreatedDto, UserCreateDto } from 'src/presentation/dtos/user';
import { CreateUserMapper } from '@core/domain/mappers/user/create-user.mapper';
import { HasherInterface } from '@core/domain/interfaces/hasher.interface';

export class UpdateUserUseCase implements BaseUseCase {
  constructor(
    private readonly hasher: HasherInterface,
    private readonly createUserMapper: CreateUserMapper,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    id: string,
    createUserData: UserCreateDto,
  ): Promise<UserCreatedDto> {
    if (createUserData.password) {
      createUserData.password = await this.hasher.hash(createUserData.password);
    }

    const user = await this.userRepository.update(id, createUserData);
    return this.createUserMapper.mapTo(user);
  }
}
