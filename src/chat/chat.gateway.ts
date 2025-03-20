import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { ChatService } from 'src/controllers/chat/chat.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: ['https://doa-facil.vercel.app', 'http://localhost:5173'],
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const cookies = cookie.parse(client.handshake.headers.cookie || '');
      const token = cookies.dfaccTok;

      if (!token) {
        console.log('Missing token');
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      console.log('Authenticated user:', payload);

      if (payload && payload.sub) {
        await client.join(payload.sub);
      } else {
        throw new Error('Invalid token payload');
      }
    } catch (error) {
      console.error('WebSocket authentication failed:', error.message);
      client.disconnect();
    }
  }

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
