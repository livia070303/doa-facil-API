import { Model, Types } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { Message } from 'src/schemas/message.schema';
import { User } from 'src/schemas/user.schema';
export declare class ChatService {
    private chatModel;
    private messageModel;
    private userModel;
    constructor(chatModel: Model<Chat>, messageModel: Model<Message>, userModel: Model<User>);
    sendMessage(user1: string, user2: string, message: string): Promise<Chat>;
    GetMessage(user1: Types.ObjectId, user2: Types.ObjectId): Promise<Message[]>;
    getLastMessages(userId: string): Promise<any>;
}
