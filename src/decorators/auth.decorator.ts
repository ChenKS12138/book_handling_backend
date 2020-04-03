import { verify } from 'jsonwebtoken';
import { createParamDecorator } from '@nestjs/common';
import { JWT_SECTET } from '../auth/auth.constant';

export type JwtPayload = {
  name: string;
  studentId?: string;
  email: string;
  id: number;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

const payloadFormat = (obj): JwtPayload => ({ ...obj });

// `Bearer ${token}`
export const UseJwtPayload = createParamDecorator(
  (data, req): JwtPayload =>
    req.headers['authorization'] &&
    payloadFormat(verify(req.headers['authorization'].slice(7), JWT_SECTET)),
);
