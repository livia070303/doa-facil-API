import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/controllers/chat/chat.service';
import { JwtService } from '@nestjs/jwt';
export declare class ChatGateway implements OnGatewayConnection {
    private readonly chatService;
    private readonly jwtService;
    server: Server;
    constructor(chatService: ChatService, jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleJoinRoom(userId: string, client: Socket): void;
    handleMessage(data: any): Promise<void>;
}
