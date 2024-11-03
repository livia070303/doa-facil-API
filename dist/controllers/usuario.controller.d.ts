import { UsuarioService } from './usuario/usuario.service';
import { CadastroUsuarioDto, updateCadastroUsuarioDto } from './usuario/dto/cadastro_usuario_dto';
import { ReturnCadastroUsuarioDto, ReturnListCadastroUsuarioDto } from './usuario/dto/return-cadastro_usuario.dto';
import { FavoriteService } from './usuario/favorite.service';
export declare class UsuarioController {
    private usuariosService;
    private favoriteService;
    constructor(usuariosService: UsuarioService, favoriteService: FavoriteService);
    getFavorites(userId: string): Promise<any>;
    createFavorite(body: {
        userId: string;
        donationId: string;
    }): Promise<any>;
    deleteFavorite(body: {
        userId: string;
        donationId: string;
    }): Promise<any>;
    createCadastroUsuario(createCadastroUsuarioDto: CadastroUsuarioDto): Promise<ReturnCadastroUsuarioDto>;
    getCadastroUsuarios(): Promise<ReturnListCadastroUsuarioDto>;
    getCadastroUsuarioById(id: string): Promise<ReturnCadastroUsuarioDto>;
    deleteCadastroUsuario(id: string): Promise<any>;
    atualizarCadastroUsuario(id: string, updateCadastroUsuarioDto: updateCadastroUsuarioDto): Promise<ReturnCadastroUsuarioDto>;
}
