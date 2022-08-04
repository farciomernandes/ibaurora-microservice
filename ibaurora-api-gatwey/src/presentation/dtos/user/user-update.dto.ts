import { Injectable } from '@nestjs/common';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SituationEnum } from '@shared/enums/situation.enum';
import { Roles } from '@shared/enums/roles.enum';

@Injectable()
export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum([SituationEnum.ACTIVE, SituationEnum.NOT_ACTIVE])
  situation: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  type_user_id: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Roles)
  role: string;
}
