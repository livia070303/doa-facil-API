import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true });
  dotenv.config();
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
