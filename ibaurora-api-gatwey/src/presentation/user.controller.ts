import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
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
import { ClientProxyIbAurora } from '@/infra/proxyrmq/client-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DomainError } from '@/core/domain/errors';
import { CreateUserUseCase } from '@/core/application/user';
import { UpdateUserUseCase } from '@/core/application/user/update-user.use-case';
import { GetUserUsecase } from '@/core/application/user/get-user.use-case';

@Controller('users')
@ApiTags('Users')
export class UserController {
  private clientAdminBackend: ClientProxy;

  constructor(
    private clientProxyIbAurora: ClientProxyIbAurora,
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly getUser: GetUserUsecase,
  ) {
    this.clientAdminBackend =
      this.clientProxyIbAurora.getClientProxyAdminBackendInstancia();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Role(Roles.USER)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<UserCreatedDto[]> {
    try {
      const users = await this.getAllUsers.execute();
      return users;
    } catch (error) {
      if (error instanceof GenericGetAllUser) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }

  @ApiBearerAuth('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Role(Roles.USER)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<UserCreatedDto> {
    try {
      return await this.getUser.execute(id);

      /*return await lastValueFrom(
        this.clientAdminBackend.send('buscar-usuario', id),
      );*/
    } catch (error) {
      if (error instanceof GenericGetAllUser) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserCreatedDto })
  public async create(@Body() body: UserCreateDto): Promise<any> {
    try {
      return await this.createUser.execute(body);
      //await lastValueFrom(this.clientAdminBackend.send('criar-usuario', body));
    } catch (error) {
      const { message } = error as Error;
      if (message == 'no elements in sequence') {
        return;
        //throw new BadRequestException(message);
      } else if (message == DomainError.UserAlreadyExists.message) {
        throw new BadRequestException(message);
      } else {
        throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
      }
    }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UserCreatedDto })
  public async update(
    @Body() body: UserCreateDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.updateUser.execute(id, body);
      //await lastValueFrom(this.clientAdminBackend.send('criar-usuario', body));
    } catch (error) {
      const { message } = error as Error;
      if (message == 'no elements in sequence') {
        return;
        //throw new BadRequestException(message);
      } else if (message == DomainError.UserAlreadyExists.message) {
        throw new BadRequestException(message);
      } else {
        throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
      }
    }
  }
}
