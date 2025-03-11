"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_1 = require("./env");
const auth_module_1 = require("./auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const usuario_module_1 = require("./controllers/usuario/usuario.module");
const donation_module_1 = require("./controllers/donation/donation.module");
const chat_module_1 = require("./controllers/chat/chat.module");
const chat_gateway_1 = require("./chat/chat.gateway");
const chat_service_1 = require("./controllers/chat/chat.service");
const chat_schema_1 = require("./schemas/chat.schema");
const user_schema_1 = require("./schemas/user.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:123doafacil@cluster0.3mj5p.mongodb.net', {
                connectionName: 'main',
            }),
            mongoose_1.MongooseModule.forFeature([{ name: chat_schema_1.Chat.name, schema: chat_schema_1.ChatSchema }], 'main'),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }], 'main'),
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                validate: (env) => env_1.envSchema.parse(env),
                isGlobal: true,
            }),
            usuario_module_1.UsuarioModule,
            donation_module_1.DonationModule,
            chat_module_1.ChatModule,
        ],
        controllers: [],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map