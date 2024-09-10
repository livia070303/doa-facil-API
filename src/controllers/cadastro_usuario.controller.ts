import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CadastroUsuarioService } from './cadastro_usuario/cadastro_usuario.service';
import {
  CadastroUsuarioDto,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateCadastroUsuarioDto,
} from './cadastro_usuario/dto/cadastro_usuario_dto';
import {
  ReturnCadastroUsuarioDto,
  ReturnListCadastroUsuarioDto,
} from './cadastro_usuario/dto/return-cadastro_usuario.dto';
import { hash } from 'bcryptjs';

@Controller('cadastro_usuarios')
export class CadastroUsuarioController {
  constructor(private cadastroUsuariosService: CadastroUsuarioService) {}

  @Post()
  async createCadastroUsuario(
    @Body() createCadastroUsuarioDto: CadastroUsuarioDto,
  ): Promise<ReturnCadastroUsuarioDto> {
    createCadastroUsuarioDto.senha = await hash(
      createCadastroUsuarioDto.senha,
      8,
    );

    const cadastro_usuario =
      await this.cadastroUsuariosService.createCadastroUsuario(
        createCadastroUsuarioDto,
      );
    return {
      cadastro_usuario,
      message: 'Usuário cadastrado com sucesso',
    };
  }

  @Get()
  async getCadastroUsuarios(): Promise<ReturnListCadastroUsuarioDto> {
    const resposta = await this.cadastroUsuariosService.getCadastroUsuarios();
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
    await this.cadastroUsuariosService.deleteCadastroUsuarioById(id);
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
      await this.cadastroUsuariosService.updateCadastroUsuarioById(
        id,
        updateCadastroUsuarioDto,
      );
    return {
      cadastro_usuario: cadastroUsuario,
      message: 'Cadastro do usuário atualizado com sucesso',
    };
  }
}
