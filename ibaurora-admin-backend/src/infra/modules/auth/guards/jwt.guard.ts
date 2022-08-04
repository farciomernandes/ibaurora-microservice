import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessagesHelper } from '@shared/helpers/messages.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (!user) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED);
    }
    if (err) {
      throw new BadRequestException(MessagesHelper.UNEXPECTED_ERROR);
    }
    return user;
  }
}
