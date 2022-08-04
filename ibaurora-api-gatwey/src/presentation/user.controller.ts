import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '@infra/modules/auth/guards/role.guard';
import { Role } from '@shared/decorator/role.decorator';
import { UserCreatedDto, UserCreateDto } from '@presentation/dtos/user';
import { Roles } from '@shared/enums/roles.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { GetAllUsersUseCase } from '@core/application/user/get-all-users.use-case';
import { GenericGetAllUser } from '@core/domain/errors/users/generic-get-all-users.error';
import { JwtAuthGuard } from '@infra/modules/auth/guards/jwt.guard';
import { ClientProxyCristolandia } from '@/infra/proxyrmq/client-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DomainError } from '@/core/domain/errors';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private clientAdminBackend: ClientProxy;

  constructor(
    private clientProxyCristolandia: ClientProxyCristolandia,
    private readonly getAllUsers: GetAllUsersUseCase,
  ) {
    this.clientAdminBackend =
      this.clientProxyCristolandia.getClientProxyAdminBackendInstancia();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<UserCreatedDto[]> {
    try {
      return await lastValueFrom(
        this.clientAdminBackend.send('consultar-usuarios', ''),
      );
    } catch (error) {
      if (error instanceof GenericGetAllUser) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }

  @Post()
  @Role(Roles.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserCreatedDto })
  public async create(@Body() body: UserCreateDto): Promise<any> {
    try {
      await lastValueFrom(this.clientAdminBackend.send('criar-usuario', body));
    } catch (error) {
      const { message } = error as Error;
      if (message == DomainError.UserAlreadyExists.message) {
        throw new BadRequestException(message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }
}
