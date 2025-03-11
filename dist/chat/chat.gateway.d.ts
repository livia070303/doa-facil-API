import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/controllers/chat/chat.service';
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleJoinRoom(userId: string, client: Socket): void;
    handleMessage(data: any): Promise<void>;
}
