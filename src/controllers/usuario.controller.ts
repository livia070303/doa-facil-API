import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './usuario/usuario.service';
import {
  CadastroUsuarioDto,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateCadastroUsuarioDto,
} from './usuario/dto/cadastro_usuario_dto';
import {
  ReturnCadastroUsuarioDto,
  ReturnListCadastroUsuarioDto,
} from './usuario/dto/return-cadastro_usuario.dto';
import { hash } from 'bcryptjs';

@Controller('user')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Post()
  async createCadastroUsuario(
    @Body() createCadastroUsuarioDto: CadastroUsuarioDto,
  ): Promise<ReturnCadastroUsuarioDto> {
    createCadastroUsuarioDto.senha = await hash(
      createCadastroUsuarioDto.senha,
      8,
    );

    const cadastro_usuario =
      await this.usuariosService.createCadastroUsuario(
        createCadastroUsuarioDto,
      );
    return {
      cadastro_usuario,
      message: 'Usuário cadastrado com sucesso',
    };
  }

  @Get()
  async getCadastroUsuarios(): Promise<ReturnListCadastroUsuarioDto> {
    const resposta = await this.usuariosService.getCadastroUsuarios();
    return {
      cadastro_usuario: resposta,
      message: 'ok',
    };
  }

  // @Get(':id')
  // async getCadastroUsuarioById(@Param('id') id: ObjectId
  // ): Promise<ReturnCadastroUsuariosDto> {
  //   const resposta = await this.cadastroUsuariosService.getCadastroUsuarioById(id);
  //   return {
  //     cadastro_usuario: resposta,
  //     message: 'ok',
  //   };
  // }

  @Delete(':id')
  async deleteCadastroUsuario(@Param('id') id: string): Promise<any> {
    await this.usuariosService.deleteCadastroUsuarioById(id);
    return {
      message: 'Usuário excluído com sucesso',
    };
  }

  @Put(':id')
  async atualizarCadastroUsuario(
    @Param('id') id: string,
    @Body() updateCadastroUsuarioDto: updateCadastroUsuarioDto,
  ): Promise<ReturnCadastroUsuarioDto> {
    const cadastroUsuario =
      await this.usuariosService.updateCadastroUsuarioById(
        id,
        updateCadastroUsuarioDto,
      );
    return {
      cadastro_usuario: cadastroUsuario,
      message: 'Cadastro do usuário atualizado com sucesso',
    };
  }
}
