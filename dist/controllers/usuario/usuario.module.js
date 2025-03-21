"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const usuario_service_1 = require("./usuario.service");
const usuario_controller_1 = require("../usuario.controller");
const autenticacao_controller_1 = require("../autenticacao.controller");
const user_schema_1 = require("../../schemas/user.schema");
const autorizacao_controller_1 = require("../autorizacao.controller");
const favorite_service_1 = require("./favorite.service");
const favorite_schema_1 = require("../../schemas/favorite.schema");
const donation_schema_1 = require("../../schemas/donation.schema");
const logout_controller_1 = require("../logout.controller");
let UsuarioModule = class UsuarioModule {
};
exports.UsuarioModule = UsuarioModule;
exports.UsuarioModule = UsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: favorite_schema_1.Favorite.name, schema: favorite_schema_1.FavoriteSchema },
                { name: donation_schema_1.Donation.name, schema: donation_schema_1.DonationSchema },
            ], 'main'),
        ],
        controllers: [
            usuario_controller_1.UsuarioController,
            autenticacao_controller_1.AutenticacaoController,
            autorizacao_controller_1.AuthorizerController,
            logout_controller_1.LogoutController,
        ],
        providers: [usuario_service_1.UsuarioService, favorite_service_1.FavoriteService],
        exports: [usuario_service_1.UsuarioService, favorite_service_1.FavoriteService],
    })
], UsuarioModule);
//# sourceMappingURL=usuario.module.js.map