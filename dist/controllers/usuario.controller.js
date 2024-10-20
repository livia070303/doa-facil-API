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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario/usuario.service");
const cadastro_usuario_dto_1 = require("./usuario/dto/cadastro_usuario_dto");
const bcryptjs_1 = require("bcryptjs");
let UsuarioController = class UsuarioController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async createCadastroUsuario(createCadastroUsuarioDto) {
        createCadastroUsuarioDto.senha = await (0, bcryptjs_1.hash)(createCadastroUsuarioDto.senha, 8);
        const cadastro_usuario = await this.usuariosService.createCadastroUsuario(createCadastroUsuarioDto);
        return {
            cadastro_usuario,
            message: 'Usuário cadastrado com sucesso',
        };
    }
    async getCadastroUsuarios() {
        const resposta = await this.usuariosService.getCadastroUsuarios();
        return {
            cadastro_usuario: resposta,
            message: 'ok',
        };
    }
    async deleteCadastroUsuario(id) {
        await this.usuariosService.deleteCadastroUsuarioById(id);
        return {
            message: 'Usuário excluído com sucesso',
        };
    }
    async atualizarCadastroUsuario(id, updateCadastroUsuarioDto) {
        const cadastroUsuario = await this.usuariosService.updateCadastroUsuarioById(id, updateCadastroUsuarioDto);
        return {
            cadastro_usuario: cadastroUsuario,
            message: 'Cadastro do usuário atualizado com sucesso',
        };
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cadastro_usuario_dto_1.CadastroUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "createCadastroUsuario", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getCadastroUsuarios", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteCadastroUsuario", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cadastro_usuario_dto_1.updateCadastroUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarCadastroUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map