import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CadastroUsuarioModule } from './controllers/cadastro_usuario/cadastro_usuario.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:doafacil@cluster0.3mj5p.mongodb.net', {
      connectionName: 'main',
    }),
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    CadastroUsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
