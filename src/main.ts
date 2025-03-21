import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Env } from './env';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true }) || 3000;
  dotenv.config();

  app.use(cookieParser());

  app.enableCors({
    origin: ['https://doa-facil.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://doa-facil.vercel.app',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useWebSocketAdapter(new IoAdapter(app));

  console.log('PORT:', port);
  await app.listen(port);
}
bootstrap();
