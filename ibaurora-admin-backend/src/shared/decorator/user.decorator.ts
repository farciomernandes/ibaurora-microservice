import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type IUser = {
  email: string;
};

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IUser = request.user;
    if (user && data === 'email' && user.hasOwnProperty('email')) {
      return user.email;
    }
  },
);
