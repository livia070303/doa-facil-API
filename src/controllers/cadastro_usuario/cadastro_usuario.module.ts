import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CadastroUsuario, CadastroUsuarioSchema} from 'src/schemas/cadastro_usuario.schema';
import { CadastroUsuarioService } from './cadastro_usuario.service';
import { CadastroUsuarioController } from '../cadastro_usuario.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CadastroUsuario.name, schema: CadastroUsuarioSchema }], 'main')],
  controllers: [CadastroUsuarioController],
  providers: [CadastroUsuarioService],
  exports: [CadastroUsuarioService],
})
export class CadastroUsuarioModule {}