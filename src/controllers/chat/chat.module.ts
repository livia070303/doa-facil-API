import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from '../chat.controller';
import { Chat, ChatSchema } from '../../schemas/chat.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Chat.name, schema: ChatSchema },
        { name: User.name, schema: UserSchema },
      ],
      'main',
    ),
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
