import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './login/dto/login.dto';
import { LoginService } from '../controllers/login/login.service';
import { ReturnLoginDto } from '../controllers/login/dto/return_login.dto';
import { RegisterDto } from '../controllers/login/dto/register.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ReturnLoginDto> {
    const login = await this.loginService.checkLogin(loginDto);
    if (login) {
      return {
        dados: login,
        message: 'Login feito com sucesso',
      };
    }
    return {
      dados: null,
      message: 'Login falhou',
    };
  }
}
