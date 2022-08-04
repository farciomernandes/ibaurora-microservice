import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserUseCase } from '@core/application/user/create-user.use-case';
import { UserCreatedDto, UserCreateDto } from '@presentation/dtos/user';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { GetAllUsersUseCase } from '@core/application/user/get-all-users.use-case';
import { GenericGetAllUser } from '@core/domain/errors/users/generic-get-all-users.error';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { UserAlreadyExists } from '@/core/domain/errors/users/user-already-exists.error';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  logger = new Logger(UserController.name);

  @EventPattern('consultar-usuarios')
  public async findAll(): Promise<UserCreatedDto[]> {
    try {
      return await this.getAllUsers.execute();
    } catch (error) {
      if (error instanceof GenericGetAllUser) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }

  @EventPattern('criar-usuario')
  public async create(
    @Payload() body: UserCreateDto,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.createUser.execute(body);
      await channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      await channel.ack(originalMsg);
      if (error instanceof UserAlreadyExists) {
        throw new RpcException(error.message);
      }
      throw new RpcException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }
}
