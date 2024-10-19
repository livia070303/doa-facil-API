import { Model, Types } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { Message } from 'src/schemas/message.schema';
export declare class ChatService {
    private chatModel;
    private messageModel;
    constructor(chatModel: Model<Chat>, messageModel: Model<Message>);
    sendMessage(user1: Types.ObjectId, user2: Types.ObjectId, message: string): Promise<Message>;
    GetMessage(user1: Types.ObjectId, user2: Types.ObjectId): Promise<Message[]>;
}
