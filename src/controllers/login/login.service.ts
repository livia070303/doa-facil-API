import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name, 'main') private userModel: Model<User>,
  ) {}

  async checkLogin(loginDto: LoginDto): Promise<User> {
    try {

      const login = await this.userModel.findOne(
        {
            email: loginDto.email,
            senha: loginDto.senha
        });

      if (login) {
        login.senha;
        return login;

      } else {
        throw new BadRequestException('Login não é válido');
      }
    } catch (error){
      console.log(error)
      throw new InternalServerErrorException(
        'Erro ao fazer login no banco de dados: ' + error.message,
      );
    }
  }

    // async salvaRegister(registerDto: RegisterDto): Promise<Login> {
    //     const newUser = new this.userModel({
    //       nomeCompleto: registerDto.nomeCompleto,
    //       CPF: registerDto.CPF,
    //       email: registerDto.email,
    //       senha: registerDto.senha,
    //       telefone: registerDto.telefone,
    //     });
    
    //     try {
    //       const savedUser = await newUser.save();
          
    //       savedUser.senha = undefined;
    //       savedUser.email = undefined;
    //       savedUser.CPF = undefined;
    //       return savedUser;

    //     } catch (error) {

    //       throw new InternalServerErrorException(
    //         'Erro ao salvar o registro no banco de dados: ' + error.message,
    //       );
    //     }
    //   }
}
