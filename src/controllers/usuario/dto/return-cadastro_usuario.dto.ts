import { User } from "src/schemas/user.schema";

export class ReturnCadastroUsuarioDto {
  cadastro_usuario: User;
  message: string;
}

export class ReturnListCadastroUsuarioDto {
  cadastro_usuario: User[];
  message: string;
}
