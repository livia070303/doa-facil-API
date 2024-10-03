import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './controllers/usuario/usuario.module';
import { DonationModule } from './controllers/donation/donation.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:123doafacil@cluster0.3mj5p.mongodb.net',
      {
        connectionName: 'main',
      },
    ),
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    UsuarioModule, DonationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
