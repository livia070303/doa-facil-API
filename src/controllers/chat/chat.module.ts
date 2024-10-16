import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from '../chat.controller';
import { Chat, ChatSchema } from '../../schemas/chat.schema';
import { Message, MessageSchema } from '../../schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Chat.name, schema: ChatSchema },  
        { name: Message.name, schema: MessageSchema },
      ],
      'main'  
    ),
  ],
  providers: [ChatService], 
  controllers: [ChatController],
})
export class ChatModule {}