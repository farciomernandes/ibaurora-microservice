import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenDto } from '@shared/dtos/auth/token.dto';
import { LoginUseCase } from '@core/application/auth/login.use-case';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@core/domain/entities/role.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @ApiBody({
    description: 'Authentication user',
    type: TokenDto,
  })
  @ApiCreatedResponse({ type: TokenDto })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Req() req: { user: { id: string; email: string; role: Role } },
  ): Promise<TokenDto> {
    const { id, email } = req.user;
    const role: string = req.user.role.label;
    return this.loginUseCase.execute({ id, email, role });
  }
}
