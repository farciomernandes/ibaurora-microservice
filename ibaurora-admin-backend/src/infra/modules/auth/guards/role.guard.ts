import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '@shared/enums/roles.enum';
import { MessagesHelper } from '@shared/helpers/messages.helper';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (user.role === Roles.ADMIN) {
      return true;
    } else {
      throw new ForbiddenException(MessagesHelper.FORBIDDEN);
    }
  }
}
