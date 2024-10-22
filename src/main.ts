import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Env } from './env';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true }) || 3000;
  dotenv.config();
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });


  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
