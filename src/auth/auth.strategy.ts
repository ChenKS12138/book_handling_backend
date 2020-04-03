import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECTET } from './auth.constant';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECTET,
    });
  }
  async validate(payload) {
    if (!payload) throw new UnauthorizedException();
    return payload;
  }
}
