import { UserRepository } from '@core/domain/repositories/user.repository';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { UserCreatedDto, UserCreateDto } from 'src/presentation/dtos/user';
import { CreateUserMapper } from '@core/domain/mappers/user/create-user.mapper';
import { HasherInterface } from '@core/domain/interfaces/hasher.interface';
import { DomainError } from '@core/domain/errors';

export class CreateUserUseCase implements BaseUseCase {
  constructor(
    private readonly hasher: HasherInterface,
    private readonly createUserMapper: CreateUserMapper,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(createUserData: UserCreateDto): Promise<UserCreatedDto> {
    const passwordHash = await this.hasher.hash(createUserData.password);

    const foundUserByEmail = await this.userRepository.findByEmail(
      createUserData.email,
    );

    if (foundUserByEmail) {
      throw DomainError.UserAlreadyExists;
    }

    const userEntity = this.createUserMapper.mapFrom({
      ...createUserData,
      password: passwordHash,
    });

    const user = await this.userRepository.save(userEntity);

    return this.createUserMapper.mapTo(user);
  }
}
