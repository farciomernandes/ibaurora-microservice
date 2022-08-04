import { Injectable } from '@nestjs/common';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { SituationEnum } from '@shared/enums/situation.enum';
import { Roles } from '@shared/enums/roles.enum';

@Injectable()
export class UserUpdateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum([SituationEnum.ACTIVE, SituationEnum.NOT_ACTIVE])
  situation: string;

  @IsOptional()
  @IsUUID()
  type_user_id: string;

  @IsOptional()
  @IsEnum(Roles)
  role: string;
}
