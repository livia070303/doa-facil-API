import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario/usuario.service';
import {
  CadastroUsuarioDto,
  updateCadastroUsuarioDto,
} from './usuario/dto/cadastro_usuario_dto';
import {
  ReturnCadastroUsuarioDto,
  ReturnListCadastroUsuarioDto,
} from './usuario/dto/return-cadastro_usuario.dto';
import { hash } from 'bcryptjs';
import { FavoriteService } from './usuario/favorite.service';

@Controller('user')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService, private favoriteService: FavoriteService) {}

  @Get('/favorite/:id')
  async getFavorites( @Param('id') userId: string,): Promise<any> {
    const resposta = await this.favoriteService.getAllFavorites(userId);
    return {
      favorite: resposta,
      message: 'ok',
    };
  }

  @Post('favorite')
  async createFavorite(@Body() body: { userId: string; donationId: string }): Promise<any> {
      const { userId, donationId } = body;
      await this.favoriteService.create(userId, donationId);
  
      return {
          message: 'Favorito criado com sucesso',
      };
  }

  @Delete('favorite')
  async deleteFavorite(@Query() query: { userId: string; donationId: string }): Promise<any> {
    const { userId, donationId } = query;

      await this.favoriteService.delete(userId, donationId);
  
      return {
          message: 'Favorito excluído com sucesso',
      };
  }

  @Post()
  async createCadastroUsuario(
    @Body() createCadastroUsuarioDto: CadastroUsuarioDto,
  ): Promise<ReturnCadastroUsuarioDto> {
    createCadastroUsuarioDto.senha = await hash(
      createCadastroUsuarioDto.senha,
      8,
    );

    const cadastro_usuario = await this.usuariosService.createCadastroUsuario(
      createCadastroUsuarioDto,
    );
    return {
      user: cadastro_usuario,
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

  @Get('/:id')
  async getCadastroUsuarioById(
    @Param('id') id: string,
  ): Promise<ReturnCadastroUsuarioDto> {
    const user = await this.usuariosService.getCadastroUsuarioById(id);
    return {
      user,
    };
  }

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
      user: cadastroUsuario,
      message: 'Cadastro do usuário atualizado com sucesso',
    };
  }  

}
