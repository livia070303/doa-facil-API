import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './controllers/usuario/usuario.module';
import { DonationModule } from './controllers/donation/donation.module';
import { ChatModule } from './controllers/chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './controllers/chat/chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:123doafacil@cluster0.3mj5p.mongodb.net',
      {
        connectionName: 'main',
      },
    ),
    MongooseModule.forFeature(
      [{ name: Chat.name, schema: ChatSchema }],
      'main',
    ),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'main',
    ),
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    UsuarioModule,
    DonationModule,
    ChatModule,
  ],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class AppModule {}
