import { User } from 'src/schemas/user.schema';

export class ReturnCadastroUsuarioDto {
  user: User;
  message?: string;
}

export class ReturnListCadastroUsuarioDto {
  cadastro_usuario: User[];
  message?: string;
}
