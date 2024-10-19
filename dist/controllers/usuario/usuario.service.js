"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
let UsuarioService = class UsuarioService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(cadastroUsuario) {
        return this.userModel.create(cadastroUsuario);
    }
    async createCadastroUsuario(cadastroUsuario) {
        const model = new user_schema_1.User();
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
    async getCadastroUsuarios() {
        return this.userModel.find();
    }
    async getCadastroUsuarioById(id) {
        return this.userModel.findById(id);
    }
    async getCadastroUsuarioByEmail(email) {
        return this.userModel.findOne({
            email: email,
        });
    }
    async deleteCadastroUsuarioById(id) {
        await this.userModel.findByIdAndDelete(id);
    }
    async updateCadastroUsuarioById(id, updateCadastroUsuarioDto) {
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
            }
            else {
                throw new common_1.BadRequestException('Usuário não encontrado');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao salvar o usuário no banco de dados: ' + error.message);
        }
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name, 'main')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map