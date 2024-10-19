import { UsuarioService } from './usuario/usuario.service';
import { CadastroUsuarioDto, updateCadastroUsuarioDto } from './usuario/dto/cadastro_usuario_dto';
import { ReturnCadastroUsuarioDto, ReturnListCadastroUsuarioDto } from './usuario/dto/return-cadastro_usuario.dto';
export declare class UsuarioController {
    private usuariosService;
    constructor(usuariosService: UsuarioService);
    createCadastroUsuario(createCadastroUsuarioDto: CadastroUsuarioDto): Promise<ReturnCadastroUsuarioDto>;
    getCadastroUsuarios(): Promise<ReturnListCadastroUsuarioDto>;
    deleteCadastroUsuario(id: string): Promise<any>;
    atualizarCadastroUsuario(id: string, updateCadastroUsuarioDto: updateCadastroUsuarioDto): Promise<ReturnCadastroUsuarioDto>;
}
