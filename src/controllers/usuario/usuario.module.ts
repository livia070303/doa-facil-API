import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from '../usuario.controller';
import { AutenticacaoController } from '../autenticacao.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthorizerController } from '../autorizacao.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'main',
    ),
  ],
  controllers: [UsuarioController, AutenticacaoController, AuthorizerController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
