import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CadastroUsuario } from 'src/schemas/cadastro_usuario.schema';
import {
  CadastroUsuarioDto,
  updateCadastroUsuarioDto,
} from './dto/cadastro_usuario_dto';

@Injectable()
export class CadastroUsuarioService {
  constructor(
    @InjectModel(CadastroUsuario.name, 'main')
    private userModel: Model<CadastroUsuario>,
  ) {}

  async create(cadastroUsuario: CadastroUsuario) {
    return this.userModel.create(cadastroUsuario);
  }

  async createCadastroUsuario(cadastroUsuario: CadastroUsuarioDto) {
    const model = new CadastroUsuario();
    model.nomeCompleto = cadastroUsuario.nomeCompleto;
    model.CPF = cadastroUsuario.CPF;
    model.telefone = cadastroUsuario.telefone;
    model.email = cadastroUsuario.email;
    model.CEP = cadastroUsuario.CEP;
    model.estado = cadastroUsuario.estado;
    model.rua = cadastroUsuario.rua;
    model.cidade = cadastroUsuario.cidade;
    model.senha = cadastroUsuario.senha;

    return this.userModel.create(model);
  }

  async getCadastroUsuarios(): Promise<CadastroUsuario[]> {
    return this.userModel.find();
  }

  async getCadastroUsuarioById(id: string): Promise<CadastroUsuario> {
    return this.userModel.findById(id);
  }

  async getCadastroUsuarioByEmail(email: string): Promise<CadastroUsuario> {
    return this.userModel.findOne({
      email: email,
    });
  }

  async deleteCadastroUsuarioById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async updateCadastroUsuarioById(
    id: string,
    updateCadastroUsuarioDto: updateCadastroUsuarioDto,
  ): Promise<CadastroUsuario> {
    try {
      const prof = await this.userModel.findById(id);

      if (prof) {
        prof.nomeCompleto = updateCadastroUsuarioDto.nomeCompleto;
        prof.CPF = updateCadastroUsuarioDto.CPF;
        prof.telefone = updateCadastroUsuarioDto.telefone;
        prof.email = updateCadastroUsuarioDto.email;
        prof.CEP = updateCadastroUsuarioDto.CEP;
        prof.estado = updateCadastroUsuarioDto.estado;
        prof.rua = updateCadastroUsuarioDto.rua;
        prof.cidade = updateCadastroUsuarioDto.cidade;
        prof.senha = updateCadastroUsuarioDto.senha;

        await prof.save();
        return prof;
      } else {
        throw new BadRequestException('Usuário não encontrado');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados: ' + error.message,
      );
    }
  }
}
