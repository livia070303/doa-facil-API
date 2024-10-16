import { Controller, Post, Body, Param, Get, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { Types } from 'mongoose'; // Continue usando Types.ObjectId

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  async sendMessage(
    @Body('user1') user1: string,
    @Body('user2') user2: string,
    @Body('message') message: string,
  ) {
    // Validação para garantir que os IDs são válidos
    if (!Types.ObjectId.isValid(user1) || !Types.ObjectId.isValid(user2)) {
      throw new BadRequestException('IDs de usuário inválidos');
    }
    
    // Cria instâncias de ObjectId com base nas strings recebidas
    const userIdFirst = new Types.ObjectId(user1);
    const userIdSecond = new Types.ObjectId(user2);

    return this.chatService.sendMessage(userIdFirst, userIdSecond, message);
  }

  @Get('get-messages')
  async getMessages(
    @Param('user1') user1: string,
    @Param('user2') user2: string,
  ) {
    // Validação para garantir que os IDs são válidos
    if (!Types.ObjectId.isValid(user1) || !Types.ObjectId.isValid(user2)) {
      throw new BadRequestException('IDs de usuário inválidos');
    }
    
    // Cria instâncias de ObjectId com base nas strings recebidas
    const userIdFirst = new Types.ObjectId(user1);
    const userIdSecond = new Types.ObjectId(user2);

    return this.chatService.GetMessage(userIdFirst, userIdSecond);
  }
}
