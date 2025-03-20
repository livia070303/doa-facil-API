"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log'],
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', { infer: true }) || 3000;
    dotenv.config();
    app.use(cookieParser());
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                '*',
            ];
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    console.log('PORT:', port);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map