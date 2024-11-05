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
exports.AuthorizerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const zod_1 = require("zod");
const authenticateBodySchema = zod_1.z.object({
    sub: zod_1.z.string().uuid(),
});
let AuthorizerController = class AuthorizerController {
    constructor(jwt) {
        this.jwt = jwt;
    }
    async handler(req, res) {
        const userId = this.jwt.decode(req.cookies.dfaccTok);
        const user = authenticateBodySchema.parse(userId);
        try {
            if (!user) {
                return res.status(400).json({ error: 'Token inválido' });
            }
            const payload = {
                sub: user.sub,
                token: req.cookies.accessToken,
            };
            return res.status(200).json(payload);
        }
        catch (error) {
            return res.status(400).json({ error: 'Usuário não autorizado' });
        }
    }
};
exports.AuthorizerController = AuthorizerController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizerController.prototype, "handler", null);
exports.AuthorizerController = AuthorizerController = __decorate([
    (0, common_1.Controller)('authorization'),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthorizerController);
//# sourceMappingURL=autorizacao.controller.js.map