import { createParamDecorator } from '@nestjs/common';

export const GetIp = createParamDecorator((data, req) => req && req.ip);
