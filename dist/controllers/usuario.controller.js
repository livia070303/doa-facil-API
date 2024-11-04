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
const favorite_service_1 = require("./usuario/favorite.service");
let UsuarioController = class UsuarioController {
    constructor(usuariosService, favoriteService) {
        this.usuariosService = usuariosService;
        this.favoriteService = favoriteService;
    }
    async getFavorites(userId) {
        const resposta = await this.favoriteService.getAllFavorites(userId);
        return {
            favorite: resposta,
            message: 'ok',
        };
    }
    async createFavorite(body) {
        const { userId, donationId } = body;
        await this.favoriteService.create(userId, donationId);
        return {
            message: 'Favorito criado com sucesso',
        };
    }
    async deleteFavorite(query) {
        const { userId, donationId } = query;
        await this.favoriteService.delete(userId, donationId);
        return {
            message: 'Favorito excluído com sucesso',
        };
    }
    async createCadastroUsuario(createCadastroUsuarioDto) {
        createCadastroUsuarioDto.senha = await (0, bcryptjs_1.hash)(createCadastroUsuarioDto.senha, 8);
        const cadastro_usuario = await this.usuariosService.createCadastroUsuario(createCadastroUsuarioDto);
        return {
            user: cadastro_usuario,
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
    async getCadastroUsuarioById(id) {
        const user = await this.usuariosService.getCadastroUsuarioById(id);
        return {
            user,
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
            user: cadastroUsuario,
            message: 'Cadastro do usuário atualizado com sucesso',
        };
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)('/favorite/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)('favorite'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "createFavorite", null);
__decorate([
    (0, common_1.Delete)('favorite'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteFavorite", null);
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
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getCadastroUsuarioById", null);
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
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService, favorite_service_1.FavoriteService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map