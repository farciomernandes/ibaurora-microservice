import { JwtService } from '@nestjs/jwt';
import { BaseUseCase } from '@core/base/use-cases/use-case';
import { LoginUserDto } from '@shared/dtos/auth/login-user.dto';

export class LoginUseCase implements BaseUseCase {
  constructor(private readonly jwtService: JwtService) {}

  public async execute(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const payload = {
      sub: loginUserDto.id,
      email: loginUserDto.email,
      role: loginUserDto.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
