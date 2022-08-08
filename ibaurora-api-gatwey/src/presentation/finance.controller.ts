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
import { FinanceCreatedDto } from '@presentation/dtos/finance/finance-created.dto';
import { FinanceCreateDto } from '@presentation/dtos/finance/finance-create.dto';
import { Roles } from '@shared/enums/roles.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { GenericGetAllUser } from '@core/domain/errors/users/generic-get-all-users.error';
import { JwtAuthGuard } from '@infra/modules/auth/guards/jwt.guard';
import { ClientProxyCristolandia } from '@/infra/proxyrmq/client-proxy';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('finances')
@ApiTags('Finance')
export class FinanceController {
  private clientAdminBackend: ClientProxy;

  constructor(private clientProxyCristolandia: ClientProxyCristolandia) {
    this.clientAdminBackend =
      this.clientProxyCristolandia.getClientProxyAdminBackendInstancia();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Role(Roles.USER)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<FinanceCreatedDto[]> {
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
  @ApiCreatedResponse({ type: FinanceCreatedDto })
  public async create(@Body() body: FinanceCreateDto): Promise<any> {
    try {
      await lastValueFrom(this.clientAdminBackend.send('criar-financa', body));
    } catch (error) {
      const { message } = error as Error;
      if (message == 'no elements in sequence') {
        throw new BadRequestException(message);
      } else {
        throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
      }
    }
  }
}
