import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { Response as ExpressResponse } from 'express';
import { UsuarioService } from './usuario/usuario.service';

const authenticateSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(3),
});

type AuthenticateInput = z.infer<typeof authenticateSchema>;

@Controller('sessions')
export class AutenticacaoController {
  constructor(
    private usuariosService: UsuarioService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(202)
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handle(@Body() body: AuthenticateInput, @Res() res: ExpressResponse) {
    const { email, senha } = body;

    const usuario = await this.usuariosService.getCadastroUsuarioByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Dados Incorretos');
    }

    const isPasswordValid = await compare(senha, usuario.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Dados Incorretos');
    }

    const accessToken = this.jwt.sign({ sub: usuario.ID });

    res.cookie('dfaccTok', accessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hour
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    const payload = {
      accessToken_token: accessToken,
      sub: usuario.ID,
    };

    return res.send(payload);
  }
}
