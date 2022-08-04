import { Controller, Req } from '@nestjs/common';
import { TokenDto } from '@shared/dtos/auth/token.dto';
import { LoginUseCase } from '@core/application/auth/login.use-case';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @EventPattern('login-usuario')
  async login(@Payload() payload: { id; email; role }): Promise<TokenDto> {
    return this.loginUseCase.execute(payload);
  }
}
