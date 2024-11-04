import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ChatService } from './chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  async sendMessage(
    @Body('user1') user1: string,
    @Body('user2') user2: string,
    @Body('message') message: string,
  ) {
    return this.chatService.sendMessage(user1, user2, message);
  }

  @Get('getLastMessages/:userIdObj')
  async getLastMessages(@Param('userIdObj') userIdObj: string) {
    const messages = this.chatService.getLastMessages(userIdObj);

    if (!messages) {
      throw new BadRequestException('Nenhuma mensagem encontrada');
    }

    return messages;
  }
}
