import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response, Request } from 'express';
import { Model } from 'mongoose';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  sub: z.string().uuid(),
});

interface User {
  _id: string;
  email: string;
  senha: string;
}

@Controller('/authorization')
export class AuthorizerController {
  constructor(
    private jwt: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  @Get()
  @HttpCode(200)
  async handler(@Req() req: Request, @Res() res: Response) {
    try {
      const decodedUser = this.jwt.decode(req.cookies.accessToken);

      const user = authenticateBodySchema.parse(decodedUser);

      if (!user) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      const foundUser = await this.userModel.findById(user.sub).exec();

      if (!foundUser) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
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
