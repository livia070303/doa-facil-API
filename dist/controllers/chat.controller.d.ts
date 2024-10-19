import { ChatService } from './chat/chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(user1: string, user2: string, message: string): Promise<import("../schemas/message.schema").Message>;
    getMessages(user1: string, user2: string): Promise<import("../schemas/message.schema").Message[]>;
}
