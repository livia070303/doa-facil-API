import { CadastroUsuario } from '../../../schemas/cadastro_usuario.schema';

export class ReturnCadastroUsuarioDto {
    cadastro_usuario: CadastroUsuario;
    message: string;
};

export class ReturnListCadastroUsuarioDto {
    cadastro_usuario: CadastroUsuario[];
    message: string;
}