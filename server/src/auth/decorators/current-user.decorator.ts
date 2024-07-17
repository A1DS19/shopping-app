import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUser = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator((_data: never, req: ExecutionContext) => getCurrentUser(req));
