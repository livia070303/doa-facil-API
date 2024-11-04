import { Model } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { User } from 'src/schemas/user.schema';
export declare class ChatService {
    private chatModel;
    private userModel;
    constructor(chatModel: Model<Chat>, userModel: Model<User>);
    sendMessage(user1: string, user2: string, message: string): Promise<Chat>;
    getLastMessages(userId: string): Promise<any>;
}
