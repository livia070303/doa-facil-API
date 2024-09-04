import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Env } from 'src/env';
import { z } from 'zod';

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get<string>('JWT_PUBLIC_KEY', { infer: true });

    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest,
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: TokenPayload) {
    console.log(payload);
    return tokenPayloadSchema.parse(payload);
  }
}
