import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { CreateUserUseCase } from '@core/application/user/create-user.use-case';
import { GetAllUsersUseCase } from '@core/application/user/get-all-users.use-case';
import { User } from '@core/domain/entities/user.entity';
import { HasherInterface } from '@core/domain/interfaces/hasher.interface';
import { CreateUserMapper } from '@core/domain/mappers/user/create-user.mapper';
import { UserRepository } from '@core/domain/repositories/user.repository';
import { BcryptAdapter } from '@infra/adapters/bcrypt.adapter';
import { UserTypeOrmRepository } from '@infra/db/type-orm/repositories/user-typeorm.repository';
import { DataSource } from 'typeorm';

export const userProvider: Provider[] = [
  {
    provide: GetAllUsersUseCase,
    useFactory: (userRepository: UserRepository): GetAllUsersUseCase => {
      return new GetAllUsersUseCase(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  // {
  //   provide: UserInMemoryRepository,
  //   useClass: UserInMemoryRepository,
  // },
  {
    provide: CreateUserMapper,
    useClass: CreateUserMapper,
  },
  {
    provide: BcryptAdapter,
    useClass: BcryptAdapter,
  },
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CreateUserUseCase,
    useFactory: (
      hasher: HasherInterface,
      createUserMapper: CreateUserMapper,
      userRepository: UserRepository,
    ): CreateUserUseCase => {
      return new CreateUserUseCase(hasher, createUserMapper, userRepository);
    },
    inject: [BcryptAdapter, CreateUserMapper, UserTypeOrmRepository],
  },
  // {
  //   provide: CreateUserUseCase,
  //   useFactory: (userRepository: UserRepository): CreateUserUseCase => {
  //     return new CreateUserUseCase(userRepository);
  //   },
  //   inject: [UserTypeOrmRepository],
  // },
  // {
  //   provide: GetUserUsecase,
  //   useFactory: (userRepository: UserRepository): GetUserUsecase => {
  //     return new GetUserUsecase(userRepository);
  //   },
  //   inject: [UserTypeOrmRepository],
  // },
  // {
  //   provide: UpdateUserUseCase,
  //   useFactory: (userRepository: UserRepository): UpdateUserUseCase => {
  //     return new UpdateUserUseCase(userRepository);
  //   },
  //   inject: [UserTypeOrmRepository],
  // },
  // {
  //   provide: RemoveUserUseCase,
  //   useFactory: (userRepository: UserRepository): RemoveUserUseCase => {
  //     return new RemoveUserUseCase(userRepository);
  //   },
  //   inject: [UserTypeOrmRepository],
  // },
];
