"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', { infer: true }) || 3000;
    dotenv.config();
    app.enableCors({
        origin: 'https://doa-facil.vercel.app ',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map