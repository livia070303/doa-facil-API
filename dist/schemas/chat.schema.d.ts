import { HydratedDocument, Types } from 'mongoose';
export type ChatDocument = HydratedDocument<Chat>;
export declare class Chat {
    userIdFirst: Types.ObjectId;
    userIdSecond: Types.ObjectId;
}
export declare const ChatSchema: import("mongoose").Schema<Chat, import("mongoose").Model<Chat, any, any, any, import("mongoose").Document<unknown, any, Chat> & Chat & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Chat>> & import("mongoose").FlatRecord<Chat> & {
    _id: Types.ObjectId;
}>;