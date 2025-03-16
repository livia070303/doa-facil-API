import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Env } from './env';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    logger: ['log'],
  });
  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true }) || 3000;
  dotenv.config();

  app.use(cookieParser());

  app.enableCors({
    // origin: (origin, callback) => {
    //   const allowedOrigins = [
    //     'http://localhost:5173',
    //     'https://doa-facil.vercel.app',
    //   ];
    //   if (allowedOrigins.includes(origin) || !origin) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed'));
    //   }
    // },
    // origin: 'http://localhost:5173',
    origin: ['http://localhost:5173', 'https://doa-facil.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(204);
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  console.log('PORT:', port);
  await app.listen(port);
}
bootstrap();
