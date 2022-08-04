import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '@core/domain/entities/user.entity';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { ValidateUserUseCase } from '@core/application/auth/validate-user.use-case';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.validateUserUseCase.execute(email, password);
    if (!user) {
      throw new UnauthorizedException(MessagesHelper.EMAIL_OR_PASSWORD_INVALID);
    }
    return user;
  }
}
