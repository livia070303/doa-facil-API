import { User } from 'src/schemas/user.schema';
export declare class ReturnCadastroUsuarioDto {
    user: User;
    message?: string;
}
export declare class ReturnListCadastroUsuarioDto {
    cadastro_usuario: User[];
    message?: string;
}
