import { GetAllClientsUseCase } from '@/core/application/client/get-all-clients.use-case';
import { Client } from '@/core/domain/entities/client.entity';
import { ClientAlreadyExists } from '@/core/domain/errors/clients/client-already-exists.error';
import { GenericGetAllClients } from '@/core/domain/errors/clients/generic-get-all-clients.error';
import { JwtAuthGuard } from '@/infra/modules/auth/guards/jwt.guard';
import { RoleGuard } from '@/infra/modules/auth/guards/role.guard';
import { ClientProxyCristolandia } from '@/infra/proxyrmq/client-proxy';
import { Role } from '@/shared/decorator/role.decorator';
import { Roles } from '@/shared/enums/roles.enum';
import { MessagesHelper } from '@/shared/helpers/messages.helper';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { ClientCreateDto } from './dtos/clients';

@Controller('clients')
@ApiTags('Clients')
export class ClientController {
  private clientAdminBackend: ClientProxy;

  constructor(
    private readonly getAllClients: GetAllClientsUseCase,
    private clientProxyCristolandia: ClientProxyCristolandia,
  ) {
    this.clientAdminBackend =
      this.clientProxyCristolandia.getClientProxyAdminBackendInstancia();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Client[]> {
    try {
      return await this.getAllClients.execute();
    } catch (error) {
      if (error instanceof GenericGetAllClients) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Client })
  public async create(@Body() body: ClientCreateDto): Promise<any> {
    try {
      return await lastValueFrom(
        this.clientAdminBackend.emit('criar-cliente', body),
      );
    } catch (error) {
      if (error instanceof ClientAlreadyExists) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }
}
