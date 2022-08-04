import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { MessagesHelper } from '@shared/helpers/messages.helper';
import { RoleCreateDto } from './dtos/role/role-create.dto';
import { CreateRoleUseCase } from '@core/application/role/create-role.use-case';
import { RoleCreatedDto } from './dtos/role/role-created.dto';
import { Role } from '@/shared/decorator/role.decorator';
import { Roles } from '@/shared/enums/roles.enum';

@Controller('roles')
// @UseGuards(AuthGuard('jwt'), RoleGuard)
export class RoleController {
  constructor(private readonly createRole: CreateRoleUseCase) {}

  @Role(Roles.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() body: RoleCreateDto): Promise<RoleCreatedDto> {
    try {
      return await this.createRole.execute(body);
    } catch (error) {
      throw new InternalServerErrorException(MessagesHelper.UNEXPECTED_ERROR);
    }
  }
}
