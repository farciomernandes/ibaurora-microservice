import { JwtService } from '@nestjs/jwt';
import { getDataSourceToken } from '@nestjs/typeorm';
import { LoginUseCase } from '@core/application/auth/login.use-case';
import { ValidateUserUseCase } from '@core/application/auth/validate-user.use-case';
import { User } from '@core/domain/entities/user.entity';
import { UserRepository } from '@core/domain/repositories/user.repository';
import { UserTypeOrmRepository } from '@infra/db/type-orm/repositories/user-typeorm.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Provider } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { DataSource } from 'typeorm';

export const authProvider: Provider[] = [
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ValidateUserUseCase,
    useFactory: (userRepository: UserRepository): ValidateUserUseCase => {
      return new ValidateUserUseCase(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  {
    provide: LoginUseCase,
    useFactory: (jwtService: JwtService): LoginUseCase => {
      return new LoginUseCase(jwtService);
    },
    inject: [JwtService],
  },
  {
    provide: LocalStrategy,
    useFactory: (validateUserUseCase: ValidateUserUseCase): LocalStrategy => {
      return new LocalStrategy(validateUserUseCase);
    },
    inject: [ValidateUserUseCase],
  },
  {
    provide: JwtAuthGuard,
    useClass: JwtAuthGuard,
  },
  {
    provide: JwtStrategy,
    useClass: JwtStrategy,
  },
];
