import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SEGREDO_SUPER_SECRETO_TELEMETRIA_2026',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
      role: payload.role,
    };
  }
}