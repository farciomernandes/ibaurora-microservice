import { CreateClientUseCase } from '@/core/application/client/create-client.use-case';
import { GetAllClientsUseCase } from '@/core/application/client/get-all-clients.use-case';
import { Client } from '@/core/domain/entities/client.entity';
import { ClientAlreadyExists } from '@/core/domain/errors/clients/client-already-exists.error';
import { GenericGetAllClients } from '@/core/domain/errors/clients/generic-get-all-clients.error';
import { MessagesHelper } from '@/shared/helpers/messages.helper';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientCreateDto } from './dtos/clients';
import {
  RpcException,
  Payload,
  EventPattern,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

const ackErrors: string[] = ['E11000'];

@Controller('clients')
export class ClientController {
  constructor(
    private readonly getAllClients: GetAllClientsUseCase,
    private readonly createClient: CreateClientUseCase,
  ) {}

  logger = new Logger(ClientController.name);

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

  @EventPattern('criar-cliente')
  public async create(
    @Payload() body: ClientCreateDto,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.createClient.execute(body);
      await channel.ack(originalMsg);
    } catch (error) {
      if (error instanceof ClientAlreadyExists) {
        this.logger.log(`error: ${JSON.stringify(error.message)}`);
        throw new RpcException(error.message);
      }

      throw new RpcException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }
}
