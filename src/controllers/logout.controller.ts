import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutController {
  constructor() {}

  @Get()
  @HttpCode(200)
  async handler(@Res() res: Response) {
    res.clearCookie('dfaccTok', { path: '/', sameSite: 'none', secure: true });

    return res.status(200).json({ message: 'Logout efetuado com sucesso' });
  }
}
