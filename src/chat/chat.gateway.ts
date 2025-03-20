import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/controllers/chat/chat.service';

@WebSocketGateway({
  cors: {
    origin: ['https://doa-facil.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinRoom')
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userId);
    // console.log(`user ${userId} joined room`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: any) {
    const { user1, user2, message } = data;

    // console.log(`handling message from ${user1} to ${user2}`);

    const savedMessage = await this.chatService.sendMessage(
      user1,
      user2,
      message,
    );

    const lastMessage = savedMessage.messages[savedMessage.messages.length - 1];

    this.server.to(user2).emit('newMessage', lastMessage);

    // console.log(`message delivered to ${user2}`);
  }
}
