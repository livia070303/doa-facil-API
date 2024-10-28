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
exports.AutenticacaoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const zod_validation_pipe_1 = require("../pipes/zod-validation-pipe");
const zod_1 = require("zod");
const bcryptjs_1 = require("bcryptjs");
const usuario_service_1 = require("./usuario/usuario.service");
const authenticateSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    senha: zod_1.z.string().min(3),
});
let AutenticacaoController = class AutenticacaoController {
    constructor(usuariosService, jwt) {
        this.usuariosService = usuariosService;
        this.jwt = jwt;
    }
    async handle(body, res) {
        const { email, senha } = body;
        const usuario = await this.usuariosService.getCadastroUsuarioByEmail(email);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Dados Incorretos');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(senha, usuario.senha);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Dados Incorretos');
        }
        const accessToken = this.jwt.sign({ sub: usuario.ID });
        res.cookie('dfaccTok', accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        const payload = {
            accessToken_token: accessToken,
            sub: usuario.ID,
        };
        return res.send(payload);
    }
};
exports.AutenticacaoController = AutenticacaoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(202),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(authenticateSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutenticacaoController.prototype, "handle", null);
exports.AutenticacaoController = AutenticacaoController = __decorate([
    (0, common_1.Controller)('sessions'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        jwt_1.JwtService])
], AutenticacaoController);
//# sourceMappingURL=autenticacao.controller.js.map