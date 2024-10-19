import { Model } from 'mongoose';
import { CadastroUsuarioDto, updateCadastroUsuarioDto } from './dto/cadastro_usuario_dto';
import { User } from 'src/schemas/user.schema';
export declare class UsuarioService {
    private userModel;
    constructor(userModel: Model<User>);
    create(cadastroUsuario: User): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCadastroUsuario(cadastroUsuario: CadastroUsuarioDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCadastroUsuarios(): Promise<User[]>;
    getCadastroUsuarioById(id: string): Promise<User>;
    getCadastroUsuarioByEmail(email: string): Promise<User>;
    deleteCadastroUsuarioById(id: string): Promise<void>;
    updateCadastroUsuarioById(id: string, updateCadastroUsuarioDto: updateCadastroUsuarioDto): Promise<User>;
}
