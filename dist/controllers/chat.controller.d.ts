import { ChatService } from './chat/chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(user1: string, user2: string, message: string): Promise<import("../schemas/chat.schema").Chat>;
    getLastMessages(userIdObj: string): Promise<any>;
}
