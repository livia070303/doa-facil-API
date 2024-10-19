import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { Response as ExpressResponse } from 'express';
import { UsuarioService } from './usuario/usuario.service';
declare const authenticateSchema: z.ZodObject<{
    email: z.ZodString;
    senha: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    senha?: string;
}, {
    email?: string;
    senha?: string;
}>;
type AuthenticateInput = z.infer<typeof authenticateSchema>;
export declare class AutenticacaoController {
    private usuariosService;
    private jwt;
    constructor(usuariosService: UsuarioService, jwt: JwtService);
    handle(body: AuthenticateInput, res: ExpressResponse): Promise<ExpressResponse<any, Record<string, any>>>;
}
export {};
