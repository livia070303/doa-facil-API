import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Env } from 'src/env';
import { z } from 'zod';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sub?: string;
}, {
    sub?: string;
}>;
export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService<Env, true>);
    validate(payload: TokenPayload): Promise<{
        sub?: string;
    }>;
}
export {};
