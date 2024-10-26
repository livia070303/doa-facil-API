import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  sub: z.string().uuid(),
});

@Controller('authorization')
export class AuthorizerController {
  constructor(
    private jwt: JwtService,
    
  ) {}

  @Get()
  @HttpCode(200)
  async handler(@Req() req: Request, @Res() res: Response) {
    const userId = this.jwt.decode(req.cookies.dfaccTok)

    const user = authenticateBodySchema.parse(userId);

    try {

      if (!user) {
        return res.status(400).json({ error: 'Token inválido' });
      }
      

      const payload = {
        sub: user.sub,
        token: req.cookies.accessToken,
      };

      return res.status(200).json(payload);
    } catch (error) {
      return res.status(400).json({ error: 'Usuário não autorizado' });
    }
  }


}
@Controller('logout')
export class LogoutController {
  constructor(
  ) {}

  @Get()
  @HttpCode(200)
  async handler(@Res() res: Response) {
    res.clearCookie('dfaccTok');

    return res.status(200).json({ message: 'Logout efetuado com sucesso' });
  }
}
